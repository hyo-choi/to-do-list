const content = document.querySelector("#content"),
	menuTab = document.querySelector("#tab"),
	toDoListFrame = content.querySelector("ul");

const addWindow = modalBackground.querySelector(".js-add-window"),
	addOpenButton = menuTab.querySelector(".js-add-tab-button"),
	addCloseButton = addWindow.querySelector(".js-add__close-button"),
	addInAddButton = addWindow.querySelector(".js-add__add-button"),
	inputToDoTitle = addWindow.querySelector(".js-add__title"),
	inputToDoDesc = addWindow.querySelector(".js-add__desc"),
	inputToDoDate = addWindow.querySelector(".js-add__date"),
	inputToDoImportance = addWindow.querySelector(".js-add__importance"),
	inputDisplayImportance = addWindow.querySelector(".js-add__display-importance");

const TODOS_LS = "toDoStorage",
	MENU_CLICKED = "to-do__menu--clicked",
	ITEM_CLICKED = "to-do-item--clicked",
	MODIFY_BUTTON = "to-do__modify",
	DONE_BUTTON = "to-do__done",
	DELETE_BUTTON = "to-do__delete";

let newId,
	toDoStorage = [];

let globalToDoContent = null,
	globalTargetToDo = null;

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
	modifyButton.innerText = "+";
	doneButton.className = DONE_BUTTON;
	doneButton.innerText = "✓";
	deleteButton.className = DELETE_BUTTON;
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
		parsedToDos.forEach(function (toDoObj) {
			makeToDo(toDoObj.title, toDoObj.desc, toDoObj.date, toDoObj.importance);
		});
	}
}

function init() {
	newId = 0;
	loadToDos();
	addOpenButton.addEventListener("click", toggleAddWindow);
}

init();
