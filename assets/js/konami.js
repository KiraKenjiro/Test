const colors = ["#6e32c3", "#ffffff"];
const angle1 = 60;
const angle2 = 120;
const spread = 50;
const origin = { x: 0.5, y: 0.5 };

// Define multiple patterns with corresponding functions
const patterns = [
	{
		keys: [
			"ArrowUp",
			"ArrowUp",
			"ArrowDown",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"ArrowLeft",
			"ArrowRight",
			"b",
			"a",
		],
		action: () => {
			// Custom function for the first pattern
			const end = Date.now() + 15 * 1000;
			function loopUntilEndDate() {
				// Use setInterval to loop until the end date
				const intervalId = setInterval(() => {
					if (Date.now() > end) {
						clearInterval(intervalId);
						return;
					}

					confetti({
						particleCount: 2,
						angle: angle1,
						spread: spread,
						origin: { x: origin.x - 0.5, y: origin.y },
						colors: colors,
					});

					confetti({
						particleCount: 2,
						angle: angle2,
						spread: spread,
						origin: { x: origin.x + 0.5, y: origin.y },
						colors: colors,
					});
				}, 10);
			}

			loopUntilEndDate();
		},
	},
	{
		keys: ["l", "o", "v", "e"],
		action: () => {
			const defaults = {
				spread: 360,
				ticks: 100,
				gravity: 0,
				decay: 0.94,
				startVelocity: 30,
				shapes: ["heart"],
				colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
			};

			confetti({
				...defaults,
				particleCount: 50,
				scalar: 2,
			});

			confetti({
				...defaults,
				particleCount: 25,
				scalar: 3,
			});

			confetti({
				...defaults,
				particleCount: 10,
				scalar: 4,
			});
		},
	},
	// Add more patterns as needed
];

var currentPatternIndex = 0;
var currentKeyIndex = 0;

var keyHandler = function (event) {
	var matchedPatterns = patterns.filter(
		(pattern) => event.key === pattern.keys[currentKeyIndex]
	);

	if (matchedPatterns.length === 0) {
		currentKeyIndex = 0;
		return;
	}

	currentKeyIndex++;

	if (
		currentKeyIndex >
		Math.max(...matchedPatterns.map((pattern) => pattern.keys.length))
	) {
		currentKeyIndex = 0;
	}

	if (
		currentKeyIndex ===
		Math.min(...matchedPatterns.map((pattern) => pattern.keys.length))
	) {
		matchedPatterns.forEach((matchedPattern) => matchedPattern.action());

		currentKeyIndex = 0;
	}
};

document.addEventListener("keydown", keyHandler, false);
