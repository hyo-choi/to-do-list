const content = document.querySelector("#content"),
	toDoTab = document.querySelector("#tab"),
	toDoList = content.querySelector("ul");

const addWindow = modalBackground.querySelector(".js-add-window"),
	toDoAddButton = toDoTab.querySelector(".js-add-tab-button"),
	addCloseButton = addWindow.querySelector(".js-add__close-button"),
	addApplyButton = addWindow.querySelector(".js-add__add-button"),
	inputToDoTitle = addWindow.querySelector(".add__title"),
	inputToDoDesc = addWindow.querySelector(".add__desc");

const TODOS_LS = "toDos";

let newId,
	toDos = [];

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function makeToDo(Title, Desc) {
	const li = document.createElement("li"),
		itemDiv = document.createElement("div"),
		contentDiv = document.createElement("div"),
		button = document.createElement("button"),
		toDoTitle = document.createElement("h4"),
		toDoDesc = document.createElement("p");

	itemDiv.className = "to-do-item";
	contentDiv.className = "to-do__content";
	toDoTitle.className = "to-do__title";
	if (Title.length > 18)
		toDoTitle.innerText = Title.substring(0, 18) + "...";
	else
		toDoTitle.innerText = Title;
	contentDiv.appendChild(toDoTitle);
	toDoDesc.className = "to-do__desc";
	if (Desc.length > 22)
		toDoDesc.innerText = Desc.substring(0, 22) + "...";
	else
		toDoDesc.innerText = Desc;
	contentDiv.appendChild(toDoDesc);
	button.className = "to-do__menu";
	button.innerText = "≡";
	itemDiv.appendChild(contentDiv);
	itemDiv.appendChild(button);
	const toDoObj = {
		title: Title,
		id: newId,
		desc: Desc
	}
	li.id = newId++;
	li.appendChild(itemDiv);
	toDoList.appendChild(li);
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event) {
	event.preventDefault();
	const title = inputToDoTitle.value,
		desc = inputToDoDesc.value;
	if (title) {
		if (desc)
			makeToDo(title, desc);
		else
			makeToDo(title, "");
		inputToDoTitle.value = "";
		inputToDoDesc.value = "";
		getAddModal();
	}
}

function getAddModal() {
	if (modalBackground.classList.contains(NOTSHOWING)) {
		modalBackground.classList.remove(NOTSHOWING);
		addWindow.classList.remove(NOTSHOWING);
	}
	else {
		modalBackground.classList.add(NOTSHOWING);
		addWindow.classList.add(NOTSHOWING);
		inputToDoTitle.value = "";
		inputToDoDesc.value = "";
	}
}

function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach(function (toDoObj) {
			makeToDo(toDoObj.title, toDoObj.desc);
		});
	}
}

function init() {
	newId = 0;
	loadToDos();
	toDoAddButton.addEventListener("click", getAddModal);
	addCloseButton.addEventListener("click", getAddModal);
	addApplyButton.addEventListener("click", handleSubmit);
}

init();
