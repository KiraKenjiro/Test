const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const config = require("../config.json");

// Define log colors for different message levels
const logColors = {
	0: "\x1b[34m", // Blue (info)
	1: "\x1b[32m", // Green (success)
	2: "\x1b[33m", // Yellow (warning)
	3: "\x1b[31m", // Red (error)
};

// Define the directory for log files
const logDir = path.join(__dirname, "logs");

// Ensure the log directory exists, creating it if necessary
async function ensureLogDirExists() {
	try {
		await fsPromises.access(logDir);
	} catch (error) {
		await fsPromises.mkdir(logDir);
	}
}

// Function to clean up old log files if the number of log files exceeds the configured maximum
async function cleanUpOldLogs() {
	const logFiles = await fsPromises.readdir(logDir);
	if (logFiles.length > config.maxLogs) {
		const sortedLogFiles = logFiles.sort();
		const logsToRemove = sortedLogFiles.slice(
			0,
			logFiles.length - config.maxLogs
		);
		await Promise.all(
			logsToRemove.map((logFile) => {
				const filePath = path.join(logDir, logFile);
				return fsPromises.unlink(filePath);
			})
		);
	}
}

// Clean up old log files
ensureLogDirExists().then(() => cleanUpOldLogs());

// Get the current date and time in a formatted string
async function getFormattedDate() {
	const currentDate = new Date();
	const day = String(currentDate.getDate()).padStart(2, "0");
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const year = currentDate.getFullYear();
	const hours = String(currentDate.getHours()).padStart(2, "0");
	const minutes = String(currentDate.getMinutes()).padStart(2, "0");
	const seconds = String(currentDate.getSeconds()).padStart(2, "0");

	const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`;
	return formattedDate;
}

// Define the log file name based on the date and time
async function getLogFileName() {
	const formattedDate = await getFormattedDate();
	return `${formattedDate}.log`;
}

// Define the full log file path
async function getLogFilePath() {
	const logFileName = await getLogFileName();
	return path.join(logDir, logFileName);
}

// Create a writable stream for the current log file
async function getCurrentLogFile() {
	const logFilePath = await getLogFilePath();
	const fd = await fsPromises.open(logFilePath, "a");
	return fs.createWriteStream(null, { fd });
}

// Function to log a message with a specific color (level)
async function log(message, color) {
	const formattedDate = await getFormattedDate();
	const logMessage = `[${formattedDate}] ${logColors[color]}•\x1b[0m ${message}`;

	const currentLogFile = await getCurrentLogFile();
	currentLogFile.write(`${logMessage}\n`);

	console.log(logMessage);
}

// Export the log function for use in other modules
module.exports = { log };
