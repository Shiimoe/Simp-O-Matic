import { Message } from 'discord.js';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_NAMES = [
	'one', 'two', 'three', 'four', 'five',
	'six', 'seven', 'eight', 'nine', 'keycap_ten'
];

export default home_scope => {
	const { message, args }
		: { message: Message,
			args: string[] } = home_scope;

	const input = args.length === 0
		? "nibba"
		: args.join(' ').toLowerCase();

	const letters = [...input].map((chr: any) => {
		if (chr === ' ') return chr;
		if (isNaN(chr) && ALPHABET.includes(chr))
			return chr === 'b'
				? chr.emojify()
				: `regional_indicator_${chr}`.emojify();
		if (!isNaN(Number(chr)))
			return NUMBER_NAMES[Number(chr)].emojify();
		return chr;
	});

	message.channel.send(letters.join(' '));
};