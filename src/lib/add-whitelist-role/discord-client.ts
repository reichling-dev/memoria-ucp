import type { GuildMember } from './models.js'

class DiscordClient {
    private readonly baseUrl: string = 'https://discord.com/api/v10'
    private readonly guildId: string
    private readonly token: string

    constructor(serverId: string, token: string) {
        this.guildId = serverId
        this.token = token
    }

    async getGuildMember(userId: string): Promise<GuildMember> {
        const response = await fetch(
            `${this.baseUrl}/guilds/${this.guildId}/members/${userId}`,
            {
                headers: {
                    Authorization: `Bot ${this.token}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        return response.json()
    }

    async patchGuildMemberRoles(
        userId: string,
        roles: string[]
    ): Promise<void> {
        await fetch(
            `${this.baseUrl}/guilds/${this.guildId}/members/${userId}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bot ${this.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roles: roles }),
            }
        )
    }
}

export default DiscordClient
