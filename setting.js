const MODALBG = "js-modal-background",
	MODALWINDOW = "js-modal-window",
	NOTSHOWING = "not-showing";

const settingButton = document.querySelector("#js-setting__open-button"),
	settingCloseButton = document.querySelector(".js-setting__close-button"),
	modalBackground = document.querySelector(`.${MODALBG}`),
	modalWindow = document.querySelector(`.${MODALWINDOW}`);

function getSettingModal() {
	if (modalBackground.classList.contains(NOTSHOWING)) {
		modalBackground.classList.remove(NOTSHOWING);
		modalWindow.classList.remove(NOTSHOWING);
	}
	else {
		modalBackground.classList.add(NOTSHOWING);
		modalWindow.classList.add(NOTSHOWING);
	}
}

function init() {
	settingButton.addEventListener("click", getSettingModal);
	settingCloseButton.addEventListener("click", getSettingModal);
}

init();
