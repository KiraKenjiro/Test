const svgCaptcha = require("svg-captcha");
const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

async function generateCaptcha(userID) {
    // Set the base filename for the captcha
    const baseFilename = `${userID}`;
    const pngExtension = "png";
    const subFolderPath = path.join(__dirname, "captchas");

    // Define filenames and file paths
	const pngFilename = `${baseFilename}.${pngExtension}`;
	const pngFilePath = path.join(subFolderPath, pngFilename);
	const svgFilePath = path.join(subFolderPath, `${baseFilename}.svg`);

    try {
        // Check if the file already exists
        const fileExists = await fs.access(pngFilePath)
            .then(() => true)
            .catch(() => false);

        // If the file exists, delete it
        if (fileExists) {
            await fs.unlink(pngFilePath);
        }

        // Ensure the subfolder exists
        await fs.mkdir(subFolderPath, { recursive: true });

        // Create a CAPTCHA using svg-captcha
        const captchaOptions = {
            size: 5,
            noise: 5,
            color: true,
        };

        const captcha = svgCaptcha.create(captchaOptions);
        const generatedCode = captcha.text;

        // Save the CAPTCHA as an SVG file
        await fs.writeFile(path.join(subFolderPath, `${baseFilename}.svg`), captcha.data);

        // Convert the SVG to a PNG file using Sharp
        await sharp(svgFilePath).png().toFile(pngFilePath);

        // Remove the temporary SVG file
        await fs.unlink(path.join(subFolderPath, `${baseFilename}.svg`));

        // Return the generated CAPTCHA's text and file path
        return { text: generatedCode, filePath: pngFilePath };
    } catch (err) {
        console.error("Error generating CAPTCHA:", err);
        return { error: err };
    }
}

module.exports = { generateCaptcha };
