// Define and require modules
const truncate = require("../../data/js/util").truncate;
const { Command } = require("discord.js-commando");
const embed = require("../../data/js/util").embed;
const { stripIndents } = require("common-tags");
const wikipedia = require("wikijs").default;
const config = require("../../config");

module.exports = class wikipediaCommand extends Command {
	constructor(client) {
		super(client, {
			"name": "wikipedia",
			"memberName": "wikipedia",
			"aliases": ["wiki"],
			"group": "search",
			"description": "Search Wikipedia.",
			"details": stripIndents`
				Run \`${config.prefix.commands}wikipedia <search>\` to search Wikipedia.
				**Notes:**
				<search>: Required, what will be searched.
				Arguments must be links, slugs, or titles. 
			`,
			"args": [
				{
					"key": "toSearch",
					"prompt": "What would you like to search for?",
					"type": "string"
				}
			],
			"clientPermissions": ["SEND_MESSAGES", "EMBED_LINKS"],
			"throttling": {
				"usages": 2,
				"duration": 5
			}
		});
	}

	async run(message, { toSearch }) {
		wikipedia().page(toSearch).then(async result => {
			const embedMessage = {
				"attachments": ["data/img/wikipedia.png"],
				"title": result.raw.title,
				"url": result.url(),
				"thumbnail": "attachment://wikipedia.png"
			};

			const summary = await result.summary();
			if (summary.match(/may refer to:/)) {
				embedMessage.description = stripIndents`
					**Multiple results found:**
					${truncate((await result.links()).join(", "), 250)}
				`;
			} else {embedMessage.description = truncate(summary, 250)}

			return message.channel.send(embed(embedMessage, message));
		}).catch(() => {message.reply(`I cannot find any article related to ${toSearch}.`)});
	}
};