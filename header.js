const header = document.querySelector(".js-header"),
	greeting = header.querySelector(".js-greeting"),
	greetingForm = header.querySelector(".js-greeting-form"),
	greetingInput = greetingForm.querySelector("input");

const NAME_LS = "username",
	INACTIVE = "inactive";

function handleNameSubmit(event) {
	event.preventDefault();
	if (greetingInput.value === "")
		return;
	const name = greetingInput.value;
	localStorage.setItem(NAME_LS, name);
	loadName();
}

function askForName() {
	greetingInput.value = "";
	if (greetingForm.classList.contains(NOTSHOWING))
		greetingForm.classList.remove(NOTSHOWING);
	greetingForm.addEventListener("submit", handleNameSubmit);
}

function greetingToName(name) {
	if (resetNameButton.classList.contains(INACTIVE))
		resetNameButton.classList.remove(INACTIVE);
	if (greeting.classList.contains(NOTSHOWING))
		greeting.classList.remove(NOTSHOWING);
	greeting.innerHTML = `Hi, ${name}`;
}

function loadName() {
	const loadedName = localStorage.getItem(NAME_LS);
	if (loadedName === null) {
		if (!resetNameButton.classList.contains(INACTIVE))
			resetNameButton.classList.add(INACTIVE);
		greeting.classList.add(NOTSHOWING);
		askForName();
	}
	else {
		greetingForm.classList.add(NOTSHOWING);
		greetingToName(loadedName);
	}
}

function init() {
	loadName();
}

init();
