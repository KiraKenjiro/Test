function isDevToolsOpen() {
	const element = new Image();
	element.__defineGetter__("id", () => {
		console.warn(
			"Warning: This console is for developers only. If someone asked you to paste something here, it may be a scam."
		);
	});
	console.group(
		"%cStop!",
		"font-size: 50px; font-weight: bold; color: #6E32C3; text-shadow: 4px 4px 8px #7158e2, 6px 6px 10px #38a3fd"
	);
	console.log(
		"%cIf someone told you to paste something here, it may be an attempt to gain unauthorized access to your computer.",
		"font-size: 16px; font-weight: 200; color: red"
	);
	console.log(
		"%cAlternatively, if you are confident in your expertise reach out to me, as there could be an opportunity for us to collaborate!",
		"font-size: 16px; font-weight: 200; color: red"
	);
	console.groupEnd();
}

isDevToolsOpen();
