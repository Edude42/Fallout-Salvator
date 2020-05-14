// Define and require modules
const configHandler = require("../../data/js/configHandler");
const checkRole = require("../../data/js/util").checkRole;
const { Command } = require("discord.js-commando");
const embed = require("../../data/js/util").embed;
const { stripIndents } = require("common-tags");
const config = require("../../config");
const safeEval = require("safe-eval");

const actions = ["view", "set", "add", "remove", "reset"];

module.exports = class configCommand extends Command {
	constructor(client) {
		super(client, {
			"name": "config",
			"memberName": "config",
			"aliases": ["conf"],
			"group": "moderation",
			"description": "Edit the server configuration.",
			"details": stripIndents`
				Run \`${config.prefix.commands}tag <action> (property) (value)\` to use commands.
				**Notes:**
				<action>: Required, what to do.
				(name): Required depending on action, what property to take action on.
				(content): Required depending on action, what to set the value of property to.

				Actions: \`${actions.join("`, `")}\`
			`,
			"args": [
				{
					"key": "action",
					"prompt": "What would you like to do?",
					"type": "string",
					"oneOf": actions
				},
				{
					"key": "property",
					"prompt": "",
					"default": "",
					"type": "string"
				},
				{
					"key": "value",
					"prompt": "",
					"default": "",
					"type": "string"
				}
			],
			"guildOnly": true,
			"clientPermissions": ["SEND_MESSAGES", "EMBED_LINKS"],
			"throttling": {
				"usages": 2,
				"duration": 5
			}
		});
	}

	async run(message, { action, property, value }) {
		const guildConfig = await configHandler.getConfig(message.guild.id);

		// Permission check
		if (!checkRole(guildConfig.automod.modRoleIDs, message)) return message.reply("You do not have permission to use this command.");

		// View command
		if (action === "view") {
			const embedMessage = {
				"title": `${message.guild.name}'s config:`,
				"description": `
\`\`\`json
${JSON.stringify(guildConfig, null, 2)}
\`\`\`
				`
			};
			return message.channel.send(embed(embedMessage, message));
		}

		// Reset command
		if (action === "reset") {
			configHandler.reset(message.guild.id);
			return message.reply("Successfully reset the config.");
		}

		// Make sure the property exists
		if (!checkExists()) return message.reply("That config property does not exist.");

		// Set command
		if (action === "set") {
			configHandler.setConfig(message.guild.id, property, value);
			return message.reply(`Set ${property} to ${value}.`);
		}

		// Add command
		if (action === "add") {
			if (!isArray()) return message.reply("That config property is not an array. Use `set` instead.");

			configHandler.addConfig(message.guild.id, property, value);
			return message.reply(`Added ${value} to ${property}.`);
		}

		// Remove command
		if (action === "remove") {
			if (!isArray()) return message.reply("That config property is not an array.");

			configHandler.removeConfig(message.guild.id, property, value);
			return message.reply(`Removed ${value} from ${property}.`);
		}

		// Function to check if a config value exists
		// Uses eval because I couldn't find a way to navigate JSON
		// with variables with dots.
		function checkExists() {
			if (safeEval(`guildConfig.${property}`, { "guildConfig": guildConfig })) return true;
			return false;
		}

		// Function to check if a config value is an array
		// Uses eval for the same reason as checkExists()
		function isArray() {
			if (safeEval(`guildConfig.${property}`, { "guildConfig": guildConfig }) instanceof Array) return true;
			return false;
		}
	}
};