export default home_scope => {
	const { message, args, HELP_SECTIONS,
			KNOWN_COMMANDS, CONFIG, ALL_HELP,
			HELP_KEY, HELP_SOURCE } = home_scope;

	if (args.length === 0 || args[0] == 'help') {
		message.channel.send(HELP_SECTIONS[0]);
		return;
	}

	if (args[0] === 'key') {
		message.channel.send(HELP_KEY);
		return;
	} else if (args[0] === 'source') {
		message.channel.send(HELP_SOURCE);
		return;
	} else if (args[0] === 'all') {
		for (const msg of ALL_HELP)
			message.channel.send(msg);
		return;
	}

	// Assume the user is now asking for help with a command:
	//   Sanitise:
	let command = args[0].trim();
	if (command.head() === CONFIG.commands.prefix)
		command = command.tail();
	if (CONFIG.commands.aliases.hasOwnProperty(command))
		command = CONFIG.commands.aliases[command].trim().squeeze();
	command = command.split(' ').head().trim().squeeze();

	const help_index = KNOWN_COMMANDS.indexOf(command);

	if (help_index === -1)
		message.answer(`No such command/help-page (\`${command}\`).`);
	else
		message.answer(`**Help (\`${command}\`):**\n`
			+ HELP_SECTIONS[help_index].trim());
}