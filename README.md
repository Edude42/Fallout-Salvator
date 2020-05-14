# WrenchBot
<img src="https://repository-images.githubusercontent.com/160117136/8186cd80-63b0-11e9-88f6-fa3933300bc1" width="200">

**Support Server:** [![Discord](https://discordapp.com/api/guilds/646517284453613578/embed.png?42)](https://encode42.dev/support)  
**CraftLight Network:** [![Discord](https://discordapp.com/api/guilds/525487377817534484/embed.png?18)](https://craftlight.org/discord)

## About
This bot is used mainly for the CraftLight Network.<br/>
If you would like to see this bot in action, go to the [CraftLight Network Discord server](https://craftlight.org/discord).

WrenchBot is a fun and helpful bot.  
It has per-server config, logging,  
and a bunch of helpful and fun commands!

**SUPPORT**: _For support, join [this Discord server](https://encode42.dev/support)._  
**DISCLAIMER**: _This bot logs executed commands for security reasons. All logged information won't be distributed or sold. Logged information is to monitor potential exploits and errors._

## Setup
Setup is mostly specific to your OS.  
This guide won't show you how to install Node.js, Python, and other global dependencies on your device. You must have [Node.js](https://nodejs.org/), [Python](https://www.python.org/), Build Tools _(C++, Python)_, and [Git](https://git-scm.com/).    

1. Create a bot via the [Discord Application panel](https://discord.com/developer/applications). [Invite the bot to your guild](https://discordpy.readthedocs.io/en/latest/discord.html).
2. Run `git clone https://github.com/Encode42/WrenchBot.git` in a folder of your choice.  
&nbsp;<sub>_For Debian, run `apt install gcc g++`. For Windows, run `npm install -g windows-build-tools@latest --vs2015`_</sub>  
3. Run `npm install`. This command installs mostly everything the bot needs. _(Linux may need root/sudo)_
4. Rename `auth-example.json` to `auth.json` and replace all tokens with your own. _(Translator tokens are optional)_
5. Change the values in `config.json` to satisfy your wants.
6. Run `node wrenchbot.js`.

## Config
Many features of the bot can be configured server-side and guild-side.  

### Server-side:
`owners`: Array of Discord user ids. Put contributor's ids in here. [Discord user ID]  
`prefix`: The prefix the bot uses for commands. [Any character]  

`translator`: Whether or not the translator will be enabled. [true / false]  

`reactions.enabled`: Whether or not the bot reacts to messages. [true / false]  
`reactions.ids.*`: ID's of the emojis the bot reacts with according to the message. [Discord emoji ID]  
&nbsp;<sub>_The bot must be in the guild that the emojis are from._</sub>  

`status.enabled`: Whether or not the bot changes its status. [true / false]  
`status.timeout`: How long the bot waits before changing its status. [Any time above 15s in ms]  
`status.statuses`: The statuses the bot switches to.  
`status.statuses.type`: The prefix of the status. [WATCHING / PLAYING / STREAMING / LISTENING]  
`status.statuses.name`: What the status is. [Any string]  

### Discord-side:
**Join**  
`join.message.enabled`: Whether or not the bot sends a message when a user joins. [true / false]  
`join.message.channelID`: The ID of the channel the welcome message is sent to. [Discord channel ID]  
`join.message.message`: What the welcome message is. [Any string]  
&nbsp;<sub>_Placeholders: `%member%`, `%server%`_</sub>  
`join.role.enabled`: Whether or not the bot gives a role when a user joins. [true / false]  
`join.role.roleID`: The ID of the role to give to the member. [Discord role ID]  

**Leave**  
`leave.message.enabled`: Whether or not the bot sends a message when a user leaves. [true / false]  
`leave.message.channelID`: The ID of the channel the leave message is sent to. [Discord channel ID]  
`leave.message.message`: What the leave message is. [Any string]  
&nbsp;<sub>_Placeholders: `%member%`, `%server%`_</sub>  

**Channels**  
`channels.advert.enabled`: Whether or not the advertising channel is enabled. [true / false]  
`channels.advert.channelIDs`: List of channel IDs to allow advertising in. [Discord channel ID]  
`channels.spam.enabled`: Whether or not the spam channel is enabled. [true / false]  
`channels.spam.channelIDs`: List of channel IDs to allow spamming in. [Discord channel ID]  
`channels.bot.enabled`: Whether or not the bot channel is enabled. [true / false]  
`channels.bot.channelIDs`: List of channel IDs to allow bot commands in. [Discord channel ID]  
`channels.counting.enabled`: Whether or not the counting minigame channel is enabled. [true / false]  
`channels.counting.channelIDs`: List of channel IDs to allow the counting minigame in. [Discord channel ID]  
`channels.log.enabled`: Whether or not the log channel is enabled. [true / false]  
`channels.log.channelID`: What channel to send logs in. [Discord channel ID]  
`channels.log.modules`: What modules the logger will log.  
Modules: `moderation` (AutoMod), `server` (Region, Role, etc. changes), `member` (Join/Leave, Bans, etc.), `channel` (Channel changes), `emoji`  
&nbsp;<sub>_All modules are booleans (true / false)_</sub>  

**Automod**  
`automod.enabled`: Whether or not the automod is enabled. (true / false)  
`automod.modRoleIDs`: List of role IDs that allow server moderation commands. [Discord role ID]  
`automod.modules`: What modules the automod will use.  
Modules: `spam`, `invites`, `badLinks`, `caps`  
&nbsp;<sub>_All modules are booleans (true / false)_</sub>  

**Misc**  
`misc.translator`: Whether or not the auto translator is enabled. (true / false)  
`misc.reactions.greetings`: Whether or not greeting/farewell reactions happen. (true / false)  
`misc.reactions.emotes`: Whether or not general emotes happen. (true / false)
