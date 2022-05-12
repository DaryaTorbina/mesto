import { Popup } from "./Popup.js";
// наследует Popup , принимает в конструктор селектор попапа и колбэк сабмита формы
export default class PopupWithForm extends Popup {
	constructor(popupSelector, submitCallback) {
	  super(popupSelector);
	  
	  this._popupForm = this._popupElement.querySelector('.popup__form');
	
	  this._inputs = this._popupForm.querySelectorAll('.popup__text');
	 
	  this._submitCallback = submitCallback;
	
	}

	//передаем форму данные пользователя   
	getPopupForm() {
	  return this._popupForm;
		}
	

	//сбирает данные всех полей формы
	_getInputValues() {
	  const inputValues = {};
	  this._inputs.forEach((input) => {
		  inputValues[input.name] = input.value;
	  });
	  return inputValues;
	}
  
	//передаем поля инпут
	getFormInputValues() {
	  return this._getInputValues();
	}

  	// перезаписывает родительский , сбрасывается
	close() {
	  super.close();
	  this._popupForm.reset();
	}
  
	//перезаписывает родительский метод/ добаляет обработчик клика по закрытию и обработчик сабмита формы 
	setEventListeners() {
	  this._popupForm.addEventListener("submit", (evt) => this._submitCallback(evt));
	  super.setEventListeners();
	}
	
  }