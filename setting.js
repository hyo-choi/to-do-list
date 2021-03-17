const settingOpenButton = document.querySelector("#js-setting__open-button"),
	modalBackground = document.querySelector(".js-modal-background"),
	settingWindow = modalBackground.querySelector(".js-setting-window"),
	settingCloseButton = settingWindow.querySelector(".js-setting__close-button"),
	resetNameButton = settingWindow.querySelector(".js-setting__name-reset-button"),
	resetToDoButton = settingWindow.querySelector(".js-setting__todo-reset-button"),
	resetAllButton = settingWindow.querySelector(".js-setting__all-reset-button");

const NOTSHOWING = "not-showing";

function modalWindowOpen(window) {
	modalBackground.classList.remove(NOTSHOWING);
	window.classList.remove(NOTSHOWING);
}

function modalWindowExit(window) {
	modalBackground.classList.add(NOTSHOWING);
	window.classList.add(NOTSHOWING);
}

function resetToDos() {
	const toDoLi = toDoListFrame.querySelectorAll("li");
	toDoLi.forEach(function (toDo) {
		toDo.remove();
	});
	toDoStorage = [];
	saveToDos();
}

function resetSavedName() {
	if (resetNameButton.classList.contains(INACTIVE))
		return false;
	localStorage.removeItem(NAME_LS);
	loadName();
	return true;
}

function resetAll() {
	resetToDos();
	localStorage.removeItem(NAME_LS);
	loadName();
}

function resetButtonCicked(event) {
	const button = event.target;

	if (button.classList.contains("js-setting__name-reset-button")) {
		if (!resetSavedName())
			return;
	}
	else if (button.classList.contains("js-setting__todo-reset-button"))
		resetToDos();
	else
		resetAll();
	modalWindowExit(settingWindow);
}

function toggleSettingWindow() {
	if (modalBackground.classList.contains(NOTSHOWING)) {
		modalWindowOpen(settingWindow);
		resetNameButton.addEventListener("click", resetButtonCicked);
		resetToDoButton.addEventListener("click", resetButtonCicked);
		resetAllButton.addEventListener("click", resetButtonCicked);
		settingCloseButton.addEventListener("click", toggleSettingWindow);
	}
	else {
		modalWindowExit(settingWindow);
	}
}

function init() {
	settingOpenButton.addEventListener("click", toggleSettingWindow);
}

init();
