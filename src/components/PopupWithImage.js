import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._popupZoomImageImg = this._popupElement.querySelector(".popup__image");
    this._popupZoomImageTitle = this._popupElement.querySelector(
      ".popup__description"
    );
  }

  open(link, name) {
    this._popupZoomImageImg.src = link;
    this._popupZoomImageImg.alt = name;
    this._popupZoomImageTitle.textContent = name;
    super.open();
  }
}
