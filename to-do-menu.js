/*
	Each to-do item's submenu.
*/

function modifyWindowExit() {
	const toDoContent = globalToDoContent;
	modifyToDoTitle.value = "";
	modifyToDoDesc.value = "";
	globalTargetToDo = null;
	globalToDoContent = null;
	modalWindowExit(modifyWindow);
	toggleToDoMenu(toDoContent.nextSibling);
}

function modifyToDo() {
	const toDoContent = globalToDoContent,
		targetToDo = globalTargetToDo;
	fillToDoText(toDoContent, modifyToDoTitle.value, modifyToDoDesc.value);
	targetToDo.title = modifyToDoTitle.value;
	targetToDo.desc = modifyToDoDesc.value;
	saveToDos();
	modifyWindowExit();
}

function modifyButtonClicked(button) {
	const toDoMenu = button.parentNode,
		toDoItem = toDoMenu.parentNode,
		toDoContent = toDoItem.querySelector(".to-do__content"),
		toDoLi = toDoItem.parentNode,
		id = parseInt(toDoLi.id);

	const targetToDo = toDoStorage.find(element => element.id === id);
	modalWindowOpen(modifyWindow);
	modifyToDoTitle.value = targetToDo.title;
	modifyToDoDesc.value = targetToDo.desc;
	globalToDoContent = toDoContent;
	globalTargetToDo = targetToDo;
	modCloseButton.addEventListener("click", modifyWindowExit);
	modInModButton.addEventListener("click", modifyToDo);
}

function innerMenuButtonClicked(event) {
	const clickedButton = event.target,
		clickedClass = clickedButton.className;

	if (clickedClass === MODIFY_BUTTON)
		modifyButtonClicked(clickedButton);
	/*
	else if (clickedClass === DONE_BUTTON)
		doneButtonClicked(clickedButton);
	else if (clickedClass === DELETE_BUTTON)
		deleteButtonClicked(clickedButton)
	*/
}

function toDoMenuClicked(event) {
	const menuButton = event.target;

	toggleToDoMenu(menuButton);
}
