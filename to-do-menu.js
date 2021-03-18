/*
	Each to-do item's submenu.
	to-do done button's behavior is on "to-do-done.js".
*/

let globalToDoContent = null,
	globalTargetToDo = null;

function modifyWindowExit() {
	const toDoContent = globalToDoContent;
	modifyToDoTitle.value = "";
	modifyToDoDesc.value = "";
	modifyToDoDate.value = "";
	modifyToDoImportance.value = 3;
	globalTargetToDo = null;
	globalToDoContent = null;
	modalWindowExit(modifyWindow);
	toggleToDoMenu(toDoContent.nextSibling);
}

function modifyToDo() {
	const toDoContent = globalToDoContent,
		targetToDo = globalTargetToDo;

	if (!modifyToDoTitle.value)
		return;
	fillToDoText(toDoContent, modifyToDoTitle.value, modifyToDoDesc.value);
	targetToDo.title = modifyToDoTitle.value;
	targetToDo.desc = modifyToDoDesc.value;
	targetToDo.date = modifyToDoDate.value;
	targetToDo.importance = modifyToDoImportance.value;
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
	modifyToDoDate.value = targetToDo.date;
	modifyToDoImportance.value = targetToDo.importance;
	modifyDisplayImportance.innerText = targetToDo.importance;
	globalToDoContent = toDoContent;
	globalTargetToDo = targetToDo;
	modifyToDoImportance.addEventListener("input", displayImportance);
	modCloseButton.addEventListener("click", modifyWindowExit);
	modInModButton.addEventListener("click", modifyToDo);
}

function deleteButtonClicked(button) {
	const toDoMenu = button.parentNode,
		toDoItem = toDoMenu.parentNode,
		toDoLi = toDoItem.parentNode,
		id = parseInt(toDoLi.id);

	toDoListFrame.removeChild(toDoLi);
	const newToDos = toDoStorage.filter(function (toDo) {
		return toDo.id !== id;
	});
	toDoStorage = newToDos;
	saveToDos();
}

function innerMenuButtonClicked(event) {
	const clickedButton = event.target,
		clickedClass = clickedButton.classList;

	if (clickedClass.contains(MODIFY_BUTTON))
		modifyButtonClicked(clickedButton);
	else if (clickedClass.contains(DONE_BUTTON))
		doneButtonClicked(clickedButton);
	else if (clickedClass.contains(DELETE_BUTTON))
		deleteButtonClicked(clickedButton)
}

function toDoMenuClicked(event) {
	const menuButton = event.target;

	toggleToDoMenu(menuButton);
}
