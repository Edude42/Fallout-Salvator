const { Command } = require('discord.js-commando');
const Battle = require('../../data/js/battle');
const { list, firstUpperCase } = require('../util');
const { verify } = require('../util');


module.exports = class battleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'battle',
			aliases: ['fight', 'death-battle'],
			group: 'fun',
			memberName: 'battle',
			description: 'A turn-based battle with another user or AI',
			guildOnly: true,
			args: [
				{
					key: 'opponent',
					prompt: 'Who would you like to battle?',
					type: 'user',
					default: () => this.client.user
				}
			]
		});

		this.battles = new Map();
	}

	async run(msg, { opponent }) {
		if (opponent.id === msg.author.id) return msg.reply('You cannot battle yourself.');
		if (this.battles.has(msg.channel.id)) return msg.reply('Only one battle per channel!');
		this.battles.set(msg.channel.id, new Battle(msg.author, opponent));
		const battle = this.battles.get(msg.channel.id);
		function randomRange(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		try {
			if (!opponent.bot) {
				await msg.say(`${opponent}, do you accept this challenge?`);
				const verification = await verify(msg.channel, opponent);
				if (!verification) {
					this.battles.delete(msg.channel.id);
					return msg.say('Looks like they declined...');
				}
			}
			while (!battle.winner) {
				const choice = await battle.attacker.chooseAction(msg);
				if (choice === 'attack') {
					const damage = randomRange(battle.defender.guard ? 5 : 20, battle.defender.guard ? 20 : 50);
					await msg.say(`${battle.attacker} deals **${damage}** damage!`);
					battle.defender.dealDamage(damage);
					battle.attacker.useMP(-25);
					battle.reset();
				} else if (choice === 'defend') {
					await msg.say(`${battle.attacker} defends!`);
					battle.attacker.changeGuard();
					battle.attacker.useMP(-25);
					battle.reset(false);
				} else if (choice === 'special') {
					const miss = Math.floor(Math.random() * 3);
					if (miss) {
						await msg.say(`${battle.attacker}'s special attack missed!`);
					} else {
						const damage = randomRange(battle.defender.guard ? 50 : 100, battle.defender.guard ? 100 : 150);
						await msg.say(`${battle.attacker} deals **${damage}** damage!`);
						battle.defender.dealDamage(damage);
					}
					battle.attacker.useMP(50);
					battle.reset();
				} else if (choice === 'cure') {
					const amount = Math.round(battle.attacker.mp / 2);
					await msg.say(`${battle.attacker} heals **${amount}** HP!`);
					battle.attacker.heal(amount);
					battle.attacker.useMP(battle.attacker.mp);
					battle.reset();
				} else if (choice === 'final') {
					const final = randomRange(battle.defender.guard ? 40 : 100, battle.defender.guard ? 50 : 150);
					await msg.say(`${battle.attacker} uses their final move, dealing **${final}** damage!`);
					battle.defender.dealDamage(final);
					battle.attacker.useMP(battle.attacker.mp);
					battle.attacker.usedFinal = true;
					battle.reset();
				} else if (choice === 'run') {
					await msg.say(`${battle.attacker} flees!`);
					battle.attacker.forfeit();
				} else if (choice === 'failed:time') {
					await msg.say(`Time's up, ${battle.attacker}!`);
					battle.attacker.useMP(-25);
					battle.reset();
				} else {
					await msg.say('I do not know what you want to do.');
				}
			}
			const { winner } = battle;
			this.battles.delete(msg.channel.id);
			return msg.say(`The match is over! Congrats, ${winner}!`);
		} catch (err) {
			this.battles.delete(msg.channel.id);
			throw err;
		}
	}
};
