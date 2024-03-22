const cursor = document.querySelector(".cursor");
const cursorOuter = document.querySelector(".cursor-outer");

let cursorX = 0;
let cursorY = 0;
let isCursorHidden = true;

function updateCursor() {
	cursorX += (cursorX - cursorX) * 0.1;
	cursorY += (cursorY - cursorY) * 0.1;

	cursorOuter.style.left = cursorX - 27 + "px";
	cursorOuter.style.top = cursorY - 27 + "px";

	requestAnimationFrame(updateCursor);
}

document.addEventListener("mousemove", (e) => {
	const x = e.clientX;
	const y = e.clientY;

	cursor.style.left = x + "px";
	cursor.style.top = y + "px";

	setTimeout(() => {
		cursorX = x;
		cursorY = y;
	}, 20);
});

document.addEventListener("mousedown", () => {
	cursor.style.transform = "translate(-50%, -50%) scale(1.5)";

	var audio = new Audio("../Portfolio/assets/sounds/mousedown.mp3");
	audio.play();
});

document.addEventListener("mouseup", () => {
	cursor.style.transform = "translate(-50%, -50%) scale(1)";

	var audio = new Audio("../Portfolio/assets/sounds/mouseup.mp3");
	audio.play();
});

document.addEventListener("mouseleave", () => {
	if (!isCursorHidden) {
		cursor.classList.add("hidden");
		cursorOuter.classList.add("hidden");
		isCursorHidden = true;
	}
});

document.addEventListener("mouseenter", () => {
	if (isCursorHidden) {
		cursor.classList.remove("hidden");
		cursorOuter.classList.remove("hidden");
		isCursorHidden = false;
	}
});

// Hide the cursor on initial load
cursor.classList.add("hidden");
cursorOuter.classList.add("hidden");

updateCursor();

// Add event listeners for interactive elements
const interactiveElements = document.querySelectorAll(".interactive-element");

interactiveElements.forEach((element) => {
	element.addEventListener("mouseenter", () => {
		// Increase the outer cursor size when hovering over interactive elements
		cursorOuter.style.transform = "scale(0.60)";
	});

	element.addEventListener("mouseleave", () => {
		// Reset the outer cursor size when leaving interactive elements
		cursorOuter.style.transform = "scale(1)";
	});
});
