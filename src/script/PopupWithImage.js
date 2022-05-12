import {Popup} from "./Popup.js"; 
import {popupZoomImageImg, popupZoomImageTitle } from '../script/utils/constants.js';

//перезаписываетродительский метод open
//нужно вставлять в попап картинку с src изображения и подписью к картинке

export default class PopupWithImage extends Popup {
    open(link, name) {
        popupZoomImageImg.src = link;
        popupZoomImageImg.alt = name;
        popupZoomImageTitle.textContent = name;
      super.open();
    }
  }