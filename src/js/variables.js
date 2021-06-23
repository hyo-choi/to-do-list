const NOTSHOWING = "not-showing";

const NAME_LS = "username",
	INACTIVE = "inactive";

const TODOS_LS = "toDoStorage",
	MENU_CLICKED = "to-do__menu--clicked",
	ITEM_CLICKED = "to-do-item--clicked",
	MODIFY_BUTTON = "js-to-do__modify",
	DONE_BUTTON = "js-to-do__done",
	RESTORE_BUTTON = "js-to-do__restore",
	DELETE_BUTTON = "js-to-do__delete";

const DONETODOS_LS = "doneToDoStorage";

const clock = document.querySelector(".js-current-time");

const header = document.querySelector(".js-header"),
	greeting = header.querySelector(".js-greeting"),
	greetingForm = header.querySelector(".js-greeting-form"),
	greetingInput = greetingForm.querySelector("input");

const settingOpenButton = document.querySelector("#js-setting__open-button"),
	modalBackground = document.querySelector(".js-modal-background"),
	settingWindow = modalBackground.querySelector(".js-setting-window"),
	settingCloseButton = settingWindow.querySelector(".js-setting__close-button"),
	resetNameButton = settingWindow.querySelector(".js-setting__name-reset-button"),
	resetToDoButton = settingWindow.querySelector(".js-setting__todo-reset-button"),
	resetAllButton = settingWindow.querySelector(".js-setting__all-reset-button");

const menuTab = document.querySelector("#tab"),
	addOpenButton = menuTab.querySelector(".js-add-tab-button"),
	currentToDoButton = menuTab.querySelector(".js-current-tab-button"),
	doneToDoButton = menuTab.querySelector(".js-done-tab-button");

const content = document.querySelector("#content"),
	toDoListFrame = content.querySelector("#js-to-do-current"),
	doneToDoListFrame = content.querySelector("#js-to-do-done");

const addWindow = modalBackground.querySelector(".js-add-window"),
	addCloseButton = addWindow.querySelector(".js-add__close-button"),
	addInAddButton = addWindow.querySelector(".js-add__add-button"),
	inputToDoTitle = addWindow.querySelector(".js-add__title"),
	inputToDoDesc = addWindow.querySelector(".js-add__desc"),
	inputToDoDate = addWindow.querySelector(".js-add__date"),
	inputToDoImportance = addWindow.querySelector(".js-add__importance"),
	inputDisplayImportance = addWindow.querySelector(".js-add__display-importance");

const modifyWindow = modalBackground.querySelector(".js-modify-window"),
	modCloseButton = modifyWindow.querySelector(".js-modify__close-button"),
	modInModButton = modifyWindow.querySelector(".js-modify__modify-button"),
	modifyToDoTitle = modifyWindow.querySelector(".js-modify__title"),
	modifyToDoDesc = modifyWindow.querySelector(".js-modify__desc"),
	modifyToDoDate = modifyWindow.querySelector(".js-modify__date"),
	modifyToDoImportance = modifyWindow.querySelector(".js-modify__importance"),
	modifyDisplayImportance = modifyWindow.querySelector(".js-modify__display-importance");

let newId,
	toDoStorage = [];

let doneToDoStorage = [],
	newDoneId;
