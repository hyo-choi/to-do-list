/*
	When to-do add button clicked
*/

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDoStorage));
}

function displayImportance(event) {
	const range = event.target,
		display = range.parentNode.querySelector("span");

	display.innerText = range.value;
}

function deleteEnteredInputs() {
	inputToDoTitle.value = "";
	inputToDoDesc.value = "";
	inputToDoDate.value = "";
	inputToDoImportance.value = 3;
}

function fillToDoText(toDoContent, titleValue, descValue) {
	const toDoTitle = toDoContent.querySelector(".to-do__title"),
		toDoDesc = toDoContent.querySelector(".to-do__desc"),
		splitedArray = descValue.split("\n"),
		splitDesc = splitedArray[0];

	if (titleValue.length > 18)
		toDoTitle.innerText = titleValue.substring(0, 18) + "...";
	else
		toDoTitle.innerText = titleValue;
	if (splitDesc.length > 20 || splitedArray[1] != null)
		toDoDesc.innerText = splitDesc.substring(0, 20) + "...";
	else
		toDoDesc.innerText = splitDesc;
}

function toggleToDoMenu(menuButton) {
	const toDoItem = menuButton.parentNode,
		toDoContent = toDoItem.querySelector(".to-do__content"),
		toDoMenu = toDoItem.querySelector(".to-do__menu-div");

	if (menuButton.classList.contains(MENU_CLICKED)) {
		menuButton.classList.remove(MENU_CLICKED);
		toDoItem.classList.remove(ITEM_CLICKED);
		toDoMenu.classList.add(NOTSHOWING);
		toDoContent.classList.remove(NOTSHOWING);
	}
	else {
		menuButton.classList.add(MENU_CLICKED);
		toDoItem.classList.add(ITEM_CLICKED);
		toDoMenu.classList.remove(NOTSHOWING);
		toDoContent.classList.add(NOTSHOWING);
	}
}

function makeToDo(Title, Desc, Date, Importance) {
	const li = document.createElement("li"),
		toDoItem = document.createElement("div"),
		toDoContent = document.createElement("div"),
		toDoMenu = document.createElement("div"),
		menuButton = document.createElement("button"),
		modifyButton = document.createElement("button"),
		doneButton = document.createElement("button"),
		deleteButton = document.createElement("button"),
		toDoTitle = document.createElement("h4"),
		toDoDesc = document.createElement("p");

	toDoItem.className = "to-do-item";
	toDoMenu.className = "to-do__menu-div";
	toDoContent.className = "to-do__content";
	toDoTitle.className = "to-do__title";
	toDoDesc.className = "to-do__desc";

	toDoContent.appendChild(toDoTitle);
	toDoContent.appendChild(toDoDesc);
	fillToDoText(toDoContent, Title, Desc);

	menuButton.className = "to-do__menu";
	menuButton.innerText = "≡";
	menuButton.addEventListener("click", toDoMenuClicked);

	modifyButton.className = MODIFY_BUTTON;
	modifyButton.classList.add("to-do__modify");
	modifyButton.innerText = "+";
	doneButton.className = DONE_BUTTON;
	doneButton.classList.add("to-do__done");
	doneButton.innerText = "✓";
	deleteButton.className = DELETE_BUTTON;
	deleteButton.classList.add("to-do__delete");
	deleteButton.innerText = "×";
	toDoMenu.appendChild(modifyButton);
	toDoMenu.appendChild(doneButton);
	toDoMenu.appendChild(deleteButton);
	modifyButton.addEventListener("click", innerMenuButtonClicked);
	doneButton.addEventListener("click", innerMenuButtonClicked);
	deleteButton.addEventListener("click", innerMenuButtonClicked);
	toDoMenu.classList.add(NOTSHOWING);

	toDoItem.appendChild(toDoMenu);
	toDoItem.appendChild(toDoContent);
	toDoItem.appendChild(menuButton);
	const toDoObj = {
		title: Title,
		id: newId,
		desc: Desc,
		date: Date,
		importance: Importance
	}
	li.id = newId++;
	li.appendChild(toDoItem);
	toDoListFrame.appendChild(li);
	toDoStorage.push(toDoObj);
	saveToDos();
}

function handleToDoSubmit(event) {
	event.preventDefault();
	const title = inputToDoTitle.value,
		desc = inputToDoDesc.value,
		date = inputToDoDate.value,
		importance = inputToDoImportance.value;
	if (title) {
		makeToDo(title, desc, date, importance);
		showCurrentTab();
		toggleAddWindow();
		deleteEnteredInputs();
	}
}

function toggleAddWindow() {
	if (modalBackground.classList.contains(NOTSHOWING)) {
		modalWindowOpen(addWindow);
		inputDisplayImportance.innerText = "3";
		inputToDoImportance.addEventListener("input", displayImportance);
		addCloseButton.addEventListener("click", toggleAddWindow);
		addInAddButton.addEventListener("click", handleToDoSubmit);
	}
	else {
		modalWindowExit(addWindow);
		deleteEnteredInputs();
	}
}

function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		if (parsedToDos === null)
			return;
		parsedToDos.sort(function (toDo1, toDo2) {
			if (toDo1.date == toDo2.date) {
				if (toDo1.importance < toDo2.importance)
					return 1;
				if (toDo1.importance > toDo2.importance)
					return -1;
			}
			if (toDo1.date == "")
				return 1;
			if (toDo2.date == "")
				return -1;
			if (toDo1.date > toDo2.date)
				return 1;
			if (toDo1.date < toDo2.date)
				return -1;
			return 0;
		});
		parsedToDos.forEach(function (toDoObj) {
			makeToDo(toDoObj.title, toDoObj.desc, toDoObj.date, toDoObj.importance);
		});
	}
}

function init() {
	newId = 0;
	newDoneId = 0;
	loadToDos();
	loadDoneToDos();
}

init();
