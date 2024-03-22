// Literaly dont ask why i do it this way, its too late in the day to deal with it
const scripts = [
	"devtools-detect.js",
	"hero-type.js",
	"loader-wheel.js",
	"typing.js",
	"konami.js",
	"update-profile.js",
	"cursor.js",
];

scripts.forEach((script) => {
	const scriptTag = document.createElement("script");
	scriptTag.src = `./assets/js/${script}`;
	document.head.appendChild(scriptTag);
});
