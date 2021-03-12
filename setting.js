const settingOpenButton = document.querySelector("#js-setting__open-button"),
	modalBackground = document.querySelector(".js-modal-background"),
	settingWindow = modalBackground.querySelector(".js-setting-window"),
	settingCloseButton = settingWindow.querySelector(".js-setting__close-button"),
	resetNameButton = settingWindow.querySelector(".js-setting__name-reset-button"),
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

function resetAll() {
	const toDoLi = toDoListFrame.querySelectorAll("li");
	toDoLi.forEach(function (toDo) {
		toDo.remove();
	});
	toDoStorage = [];
	saveToDos();
	localStorage.removeItem(NAME_LS);
	loadName();
	modalWindowExit(settingWindow);
}

function resetSavedName() {
	if (resetNameButton.classList.contains(INACTIVE))
		return;
	localStorage.removeItem(NAME_LS);
	loadName();
	toggleSettingWindow();
}

function toggleSettingWindow() {
	if (modalBackground.classList.contains(NOTSHOWING)) {
		modalWindowOpen(settingWindow);
		resetNameButton.addEventListener("click", resetSavedName);
		resetAllButton.addEventListener("click", resetAll);
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
