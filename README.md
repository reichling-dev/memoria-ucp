# Aura-applications: FiveM Whitelist System

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
   - [Environment Variables](#environment-variables)
   - [Discord Bot Setup](#discord-bot-setup)
   - [Application Configuration](#application-configuration)
   - [Admin Configuration](#admin-configuration)
6. [Usage](#usage)
   - [Running the Application](#running-the-application)
   - [Accessing the Admin Panel](#accessing-the-admin-panel)
7. [Customization](#customization)
8. [Limitations](#limitations)
9. [Troubleshooting](#troubleshooting)
10. [Support](#support)

## Introduction

Aura-applications is a free, FiveM whitelist system designed to streamline the application process for your server. It integrates seamlessly with Discord, providing a user-friendly interface for applicants and powerful management tools for administrators.

## Features

- Discord OAuth2 integration for secure authentication
- User-friendly application form
- Admin panel for application review and management
- Automated Discord notifications for application status updates
- Responsive design with dark mode support

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v14 or later)
- npm (v6 or later)
- A Discord application and bot
- A FiveM server
- Visual Studio Code Build Tools

To install Visual Studio Code Build Tools:

1. Download the Visual Studio Build Tools installer from the [official Microsoft website](https://visualstudio.microsoft.com/visual-cpp-build-tools/).
2. Run the installer.
3. In the installer, select the "Desktop development with C++" workload.
4. Make sure the following components are checked:
   - MSVC v143 - VS 2022 C++ x64/x86 build tools
   - Windows 10 SDK
   - C++ CMake tools for Windows
5. Click "Install" and wait for the installation to complete.
6. Restart your computer after the installation is finished.

## Installation

1. Clone the repository:
   git clone https://github.com/zlexif/aura-applications.git

2. Navigate to the project directory:
   cd aura-applications

3. Install dependencies:
   npm install

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
DISCORD_BOT_TOKEN=your_discord_bot_token

Replace the placeholder values with your actual credentials.

### Application Configuration

The application uses a centralized configuration file (`src/lib/config.ts`) for easy customization:

- **Admin Discord IDs**: Add admin user IDs to the `adminDiscordIds` array
- **Form Fields**: Modify questions, validation rules, and field requirements in the `sections` array
- **UI Text**: Customize form titles, descriptions, and messages in the `ui` object
- **Validation Rules**: Adjust minimum age, character limits, and error messages

### Discord Bot Setup

1. Create a new application in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Under the "Bot" section, create a bot and copy its token.
3. Enable the following Privileged Gateway Intents:
   - Presence Intent
   - Server Members Intent
   - Message Content Intent
4. Invite the bot to your server using the OAuth2 URL generator with the following scopes:
   - bot
5. Ensure the bot has permissions to send messages and read message history.

### Admin Configuration

To configure admin users, edit the `src/lib/config.ts` file:

```typescript
adminDiscordIds: [
  'your_discord_id',
  'another_admin_id'
]
```

Replace the array with the Discord IDs of users who should have admin access.

## Usage

### Running the Application In Development

1. Ensure dependencies are installed (if not already done):
   npm install

2. Start the development server:
   npm run dev

3. Access the application at `http://localhost:3000`.

### Accessing the Admin Panel

1. Log in with a Discord account configured as an admin.
2. Click the "Admin Panel" button that appears after logging in.

## Customization

- **Logo**: Replace `/public/logo.png` with your own logo.
- **Colors**: Modify the Tailwind configuration in `tailwind.config.ts`.
- **Application Fields**: Edit the form configuration in `src/lib/config.ts` to modify questions, validation rules, and field requirements.
- **Admin Permissions**: Add or remove admin Discord IDs in `src/lib/config.ts`.
- **UI Text**: Customize form titles, descriptions, and messages in `src/lib/config.ts`.

## Limitations

- The system currently supports only Discord authentication.
- File uploads are not supported in the application form.
- The application is designed for use with a single FiveM server.

## Troubleshooting

- **Discord authentication issues**: Ensure your Discord application credentials are correct and the redirect URI is properly set in the Discord Developer Portal.
- **Bot not responding**: Check that the bot token is correct and the bot has the necessary permissions in your Discord server.
- **Admin access not working**: Verify that the correct Discord IDs are set in the `adminDiscordIds` array in `src/lib/config.ts`.
- **Build errors**: If you encounter build errors, make sure you have correctly installed the Visual Studio Code Build Tools as described in the Prerequisites section.

## Support

For issues, feature requests, or general inquiries, please open an issue on the GitHub repository or contact us through our [Discord support server](https://discord.gg/663eBMPWPB).

---

Thank you for using Aura-applications! We hope this system enhances your FiveM server's whitelist process.

## License Notice

Aura-applications is licensed under the GPL-3.0 license. By using this software, you agree to the terms of the license.

## Copyright Notice

Aura-applications is written by [auradevelopment5m](https://github.com/auradevelopment5m). All rights belong to them.
Thanks a lot for the amazing work!
