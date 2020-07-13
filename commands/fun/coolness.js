// Define and require modules
const { Command }					   = require("discord.js-commando");
const { stripIndents }				   = require("common-tags");
const embed							   = require("../../data/js/util").embed;
const config						   = require("../../config");
const seedrandom					   = require("seedrandom");
const random						   = require("random");
const date							   = new Date();

module.exports = class coolnessCommand extends Command {
	constructor(client) {
		super(client, {
			"name":		   "coolness",
			"memberName":  "coolness",
			"group":	   "fun",
			"description": "Calculate the coolness of a user.",
			"details": stripIndents`
				Run \`${config.prefix.commands}coolness [person]\` to calculate a user's coolness.
				**Notes:**
				[person]: Optional, who's coolness will be calculated.
				Arguments must be under 150 characters.
			`,
			"args": [
				{
					"key":		"person",
					"prompt":	"",
					"default":	message => message.author.username,
					"type":		"string",
					"validate":	arg => {
						if (arg.length < 150) return true;
						return "Please use under 150 characters!";
					}
				}
			],
			"clientPermissions": ["SEND_MESSAGES", "EMBED_LINKS"],
			"throttling": {
				"usages":	2,
				"duration":	5
			}
		});
	}

	run(message, { person }) {
		// RNG based on person and day
		const seed	   = random.clone(seedrandom(person + (date.getDate() - date.getDay())));
		const coolness = seed.int(0, 100);

		// Define the emote to be used
		let style =					{ "emote": "good_shades",  "color": "#00FF00", "bar": "[===============   ]" };
		if (coolness < 75) style =	{ "emote": "okay_check",   "color": "#FFFF00", "bar": "[===========       ]" };
		if (coolness < 50) style =	{ "emote": "bad_unamused", "color": "#FF7700", "bar": "[=======           ]" };
		if (coolness < 25) style =	{ "emote": "cross",		   "color": "#FF0000", "bar": "[===               ]" };

		// Max out/empty percent bar according to values
		if (coolness > 95) style.bar = "[==================]";
		if (coolness < 5)  style.bar = "[                  ]";

		// Send the coolness
		return message.channel.send(embed({
			"message":	   message,
			"attachments": [`data/img/emotes/${style.emote}.png`],
			"title":	   "Coolness results:",
			"description": stripIndents`
				**${person} is ${coolness}% cool.**
				\`${style.bar}\`
			`,
			"color":	   style.color,
			"thumbnail":   `attachment://${style.emote}.png`
		}));
	}
};