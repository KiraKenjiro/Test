const fs = require("fs");
const path = require("path");

// Create an empty object to store the loaded handlers
const handlers = {};

// Define the directory path where handler modules are located
const handlersDirectory = path.join(__dirname, "handlers");

// Read the list of files in the handlers directory
const handlerFiles = fs.readdirSync(handlersDirectory);

// Iterate through each file in the handlers directory
handlerFiles.forEach((file) => {
	// Check if the file has a ".js" extension
	if (file.endsWith(".js")) {
		// Extract the handler name by removing the ".js" extension
		const handlerName = path.basename(file, ".js");

		// Construct the full path to the handler module
		const handlerPath = path.join(handlersDirectory, file);

		// Require and store the handler module in the handlers object
		handlers[handlerName] = require(handlerPath);
	}
});

// Export the handlers object, which now contains all loaded handler modules
module.exports = handlers;