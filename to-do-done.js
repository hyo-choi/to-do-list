/*
	When to-do submenu's to-do done button clicked.
	Other submenu's behaviors are on "to-do-menu.js".
*/

function saveDoneToDos() {
	localStorage.setItem(DONETODOS_LS, JSON.stringify(doneToDoStorage));
}

function doneDeleteButtonClicked(button) {
	const toDoMenu = button.parentNode,
		toDoItem = toDoMenu.parentNode,
		toDoLi = toDoItem.parentNode,
		id = parseInt(toDoLi.id);

	doneToDoListFrame.removeChild(toDoLi);
	const newToDos = doneToDoStorage.filter(function (toDo) {
		return toDo.id !== id;
	});
	doneToDoStorage = newToDos;
	saveDoneToDos();
}

function doneRestoreButtonClicked(button) {
	const toDoMenu = button.parentNode,
		toDoItem = toDoMenu.parentNode,
		toDoLi = toDoItem.parentNode,
		id = parseInt(toDoLi.id);

	const targetToDo = doneToDoStorage.find(element => element.id === id);
	makeToDo(targetToDo.title, targetToDo.desc, targetToDo.date, targetToDo.importance);
	doneDeleteButtonClicked(button);
	showCurrentTab();
}

function doneInnerMenuButtonClicked(event) {
	const button = event.target;

	if (button.classList.contains(RESTORE_BUTTON))
		doneRestoreButtonClicked(button);
	else if (button.classList.contains(DELETE_BUTTON))
		doneDeleteButtonClicked(button);
}

function makeDoneToDo(Title, Desc, Date, Importance) {
	const li = document.createElement("li"),
		toDoItem = document.createElement("div"),
		toDoContent = document.createElement("div"),
		toDoMenu = document.createElement("div"),
		menuButton = document.createElement("button"),
		restoreButton = document.createElement("button"),
		deleteButton = document.createElement("button"),
		toDoTitle = document.createElement("h4"),
		toDoDesc = document.createElement("p");

	toDoItem.className = "to-do-item";
	toDoItem.classList.add("done");
	toDoMenu.className = "to-do__menu-div";
	toDoContent.className = "to-do__content";
	toDoTitle.className = "to-do__title";
	toDoDesc.className = "to-do__desc";

	toDoContent.appendChild(toDoTitle);
	toDoContent.appendChild(toDoDesc);
	fillToDoText(toDoContent, Title, Desc);

	menuButton.className = "to-do__menu";
	menuButton.classList.add("done");
	menuButton.innerText = "≡";
	menuButton.addEventListener("click", toDoMenuClicked);

	restoreButton.className = RESTORE_BUTTON;
	restoreButton.classList.add("to-do__restore");
	restoreButton.innerText = "↩︎";
	deleteButton.className = DELETE_BUTTON;
	deleteButton.classList.add("to-do__delete");
	deleteButton.innerText = "×";
	toDoMenu.appendChild(restoreButton);
	toDoMenu.appendChild(deleteButton);
	restoreButton.addEventListener("click", doneInnerMenuButtonClicked);
	deleteButton.addEventListener("click", doneInnerMenuButtonClicked);
	toDoMenu.classList.add(NOTSHOWING);

	toDoItem.appendChild(toDoMenu);
	toDoItem.appendChild(toDoContent);
	toDoItem.appendChild(menuButton);
	const toDoObj = {
		title: Title,
		id: newDoneId,
		desc: Desc,
		date: Date,
		importance: Importance
	}
	li.id = newDoneId++;
	li.appendChild(toDoItem);
	doneToDoListFrame.appendChild(li);
	doneToDoStorage.push(toDoObj);
	saveDoneToDos();
}

function doneButtonClicked(button) {
	const toDoMenu = button.parentNode,
		toDoItem = toDoMenu.parentNode,
		toDoLi = toDoItem.parentNode,
		id = parseInt(toDoLi.id);

	const targetToDo = toDoStorage.find(element => element.id === id);
	makeDoneToDo(targetToDo.title, targetToDo.desc, targetToDo.date, targetToDo.importance);
	deleteButtonClicked(button);
}

function loadDoneToDos() {
	const loadedToDos = localStorage.getItem(DONETODOS_LS);
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		if (parsedToDos === null)
			return;
		parsedToDos.forEach(function (toDoObj) {
			makeDoneToDo(toDoObj.title, toDoObj.desc, toDoObj.date, toDoObj.importance);
		});
	}
}
