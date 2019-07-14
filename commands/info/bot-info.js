const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const Enmap = require("enmap");
const commandsRead = new Enmap({
	name: "commands-read",
	autoFetch: true,
	fetchAll: false
});
const messagesRead = new Enmap({
	name: "messages-read",
	autoFetch: true,
	fetchAll: false
});
const translationsDone = new Enmap({
	name: "translations-done",
	autoFetch: true,
	fetchAll: false
});

module.exports = class botinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bot-info',
			aliases: ['bot', 'botinfo', 'bot-info', 'bot-stats', 'botstats', 'stats'],
			group: 'info',
			memberName: 'bot-info',
			description: 'Displays information about this bot.',
			examples: ['bot-info', 'botinfo'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}
	run(msg) {
		commandsRead.fetchEverything();
		messagesRead.fetchEverything();
		const added = new Date(msg.guild.joinedTimestamp).toLocaleDateString("en-US");
		return msg.embed({
			color: 3447003,
			description: stripIndents`
				__**Info:**__
				This is a bot made for use in the **CustomCraft Network**.
				Website: **http://cust.pw**
				Issues: **http://cust.pw/wbis**
				
				__**Usage:**__
				Command prefix: ]
				Use ]help for help

				__**Stats:**__
				Messages processed: ${messagesRead.get("number")}
				Commands used: ${commandsRead.get("number")}
				Translations done: ${translationsDone.get("number")}
				Bot added on ${added}
			`
		});
	}
};