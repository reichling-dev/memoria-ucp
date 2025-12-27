import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sendDirectMessage } from '@/lib/discord-bot'
import { isAdmin } from '@/lib/auth'

type Application = {
  id: string
  timestamp: string
  username: string
  age: number
  steamId: string
  cfxAccount: string
  experience: string
  character: string
  discord: {
    id: string
    username: string
    discriminator: string
    avatar: string
    banner: string
    accentColor: number | null
    verified: boolean
    email: string
    createdAt: string
  }
  status?: 'pending' | 'approved' | 'denied'
}

const dataFilePath = path.join(process.cwd(), 'data', 'applications.json')
const archiveFilePath = path.join(process.cwd(), 'data', 'archived_applications.json')

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.discord) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isAdmin(session.discord.id)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const { status, reason } = await req.json()

    const data = await fs.readFile(dataFilePath, 'utf8')
    const applications: Application[] = JSON.parse(data)

    const applicationIndex = applications.findIndex((app) => app.id === id)
    if (applicationIndex === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    const updatedApplication = {
      ...applications[applicationIndex],
      status,
      statusReason: reason,
      updatedAt: new Date().toISOString()
    }

    applications.splice(applicationIndex, 1)
    await fs.writeFile(dataFilePath, JSON.stringify(applications, null, 2))

    let archivedApplications = []
    try {
      const archivedData = await fs.readFile(archiveFilePath, 'utf8')
      archivedApplications = JSON.parse(archivedData)
    } catch {
      console.log('No existing archive file, creating a new one')
    }
    archivedApplications.push(updatedApplication)
    await fs.writeFile(archiveFilePath, JSON.stringify(archivedApplications, null, 2))

    let discordMessageSent = false
    try {
      console.log(`Attempting to send Discord DM to user ${updatedApplication.discord.id} for ${status} application`)
      await sendDirectMessage(updatedApplication.discord.id, status as 'approved' | 'denied', reason)
      discordMessageSent = true
      console.log(`Discord message sent successfully to user ${updatedApplication.discord.id}`)
    } catch (error) {
      console.error(`Failed to send Discord message to user ${updatedApplication.discord.id}:`, error)
    }

    const message = discordMessageSent
      ? 'Application status updated and archived successfully. Discord notification sent.'
      : 'Application status updated and archived successfully. Discord notification queued for delivery.'

    return NextResponse.json({ message, discordMessageSent })
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}

