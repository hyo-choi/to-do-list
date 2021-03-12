const MODALBG = "js-modal-background",
	SETTINGWINDOW = "js-setting-window",
	NOTSHOWING = "not-showing";

const settingOpenButton = document.querySelector("#js-setting__open-button"),
	settingCloseButton = document.querySelector(".js-setting__close-button"),
	modalBackground = document.querySelector(`.${MODALBG}`),
	settingWindow = modalBackground.querySelector(`.${SETTINGWINDOW}`);

function toggleSettingWindow() {
	if (modalBackground.classList.contains(NOTSHOWING)) {
		modalBackground.classList.remove(NOTSHOWING);
		settingWindow.classList.remove(NOTSHOWING);
	}
	else {
		modalBackground.classList.add(NOTSHOWING);
		settingWindow.classList.add(NOTSHOWING);
	}
}

function init() {
	settingOpenButton.addEventListener("click", toggleSettingWindow);
	settingCloseButton.addEventListener("click", toggleSettingWindow);
}

init();
