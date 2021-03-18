/*
	For tab menu
*/

function showCurrentTab() {
	if (doneToDoListFrame.classList.contains(NOTSHOWING))
		return;
	else {
		doneToDoListFrame.classList.add(NOTSHOWING);
		toDoListFrame.classList.remove(NOTSHOWING);
	}
}

function showDoneTab() {
	if (toDoListFrame.classList.contains(NOTSHOWING))
		return;
	else {
		doneToDoListFrame.classList.remove(NOTSHOWING);
		toDoListFrame.classList.add(NOTSHOWING);
	}
}

function toggleToDoTab(event) {
	const button = event.target;

	if (button.classList.contains("js-current-tab-button"))
		showCurrentTab();
	else if (button.classList.contains("js-done-tab-button"))
		showDoneTab();
}

function init() {
	addOpenButton.addEventListener("click", toggleAddWindow);
	currentToDoButton.addEventListener("click", toggleToDoTab);
	doneToDoButton.addEventListener("click", toggleToDoTab);
}

init();
