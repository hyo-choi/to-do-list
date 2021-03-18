/*
	When setting button clicked
*/

function modalWindowOpen(window) {
	modalBackground.classList.remove(NOTSHOWING);
	window.classList.remove(NOTSHOWING);
}

function modalWindowExit(window) {
	modalBackground.classList.add(NOTSHOWING);
	window.classList.add(NOTSHOWING);
}

function resetDoneToDos() {
	const toDoLi = doneToDoListFrame.querySelectorAll("li");
	toDoLi.forEach(function (toDo) {
		toDo.remove();
	});
	doneToDoStorage = [];
	saveDoneToDos();
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
	resetDoneToDos();
	localStorage.removeItem(NAME_LS);
	showCurrentTab();
	loadName();
}

function resetButtonCicked(event) {
	const button = event.target;

	if (button.classList.contains("js-setting__name-reset-button")) {
		if (!resetSavedName())
			return;
	}
	else if (button.classList.contains("js-setting__todo-reset-button")) {
		resetToDos();
		resetDoneToDos();
	}
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
