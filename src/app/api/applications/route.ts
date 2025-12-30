import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import DiscordClient from "@/lib/custom-code/discord-client";

const dataFilePath = path.join(process.cwd(), 'data', 'applications.json')

const DISCORD_TOKEN = process.env.DISCORD_TOKEN
if (!DISCORD_TOKEN) {
  throw new Error('Missing required environment variable DISCORD_TOKEN!')
}
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID
if (!DISCORD_SERVER_ID) {
  throw new Error('Missing required environment variable DISCORD_SERVER_ID!')
}
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID
if (!DISCORD_CHANNEL_ID) {
  throw new Error('Missing required environment variable DISCORD_CHANNEL_ID!')
}

const discordClient = new DiscordClient(DISCORD_SERVER_ID, DISCORD_TOKEN)

export async function POST(req: Request) {
  try {
    const application = await req.json()

    let applications = []
    try {
      const data = await fs.readFile(dataFilePath, 'utf8')
      applications = JSON.parse(data)
    } catch {
    }

    const newApplication = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...application
    }
    applications.push(newApplication)

    await fs.writeFile(dataFilePath, JSON.stringify(applications, null, 2))

    try {
      await discordClient.sendMessageWithContentOnly(DISCORD_CHANNEL_ID, 'Ein neuer Whitelist-Antrag ist eingegangen.')
      await discordClient.sendMessageWithContentOnly(DISCORD_CHANNEL_ID, 'https://tenor.com/view/richard-attenborough-whip-whipped-whiplash-whiplashed-gif-16685949900343051341')
    } catch (error) {
      console.error('Failed to send Discord notification:', error)
    }

    return NextResponse.json({ message: 'Application submitted successfully' })
  } catch (error) {
    console.error('Error saving application:', error)
    return NextResponse.json({ error: 'Failed to save application' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    const applications = JSON.parse(data)
    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error reading applications:', error)
    return NextResponse.json({ error: 'Failed to read applications' }, { status: 500 })
  }
}

