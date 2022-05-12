import "./index.css";
import { initialCards } from "../script/utils/InitialCards.js";

import {FormValidator} from "../script/FormValidator.js";
import { Card } from "../script/Card.js";
import {Section} from "../script/Section.js";

import { config,
	popupZoomSelector,
	popupElementPhotoSelector,
	popupProfifleSelector, 
	cardSelector,inputProfileName,
	inputProfileAbout,
	editModalProfile,
	addModalMesto,
	editProfileButton,
	addMestoButton} from '../script/utils/constants.js';

import PopupWithImage from "../script/PopupWithImage.js";
import PopupWithForm from "../script/PopupWithForm.js";
import { UserInfo } from "../script/UserInfo.js";
//console.log('Hello, World!') 

// пеерменные для подключения валидации к попапу профиля и места
const popupValidatorProfile = new FormValidator(config, editModalProfile);
const  popupValidatorMesto = new FormValidator(config, addModalMesto);

/// показывает ошибки
popupValidatorProfile.enableValidation();
popupValidatorMesto.enableValidation();

//ПРОФИЛЬ
//данные пользователя popup
const userForm = new UserInfo ({inputProfileName,inputProfileAbout}); 

//запись в попап
const popupUser = new PopupWithForm (popupProfifleSelector,(evt) => {
	evt.preventDefault();
	const formInputValues = popupUser.getFormInputValues();
	userForm.setUserInfo(formInputValues.nameinput,formInputValues.aboutinput);
	popupUser.close()
})
popupUser.setEventListeners();
//редактирование
editProfileButton.addEventListener('click', () => {
	popupValidatorProfile.clearError();
	popupUser.open()
});

//ДЕЙСТВИЯ С КАРТОЧКАМИ

//функция создания карточки
function createNewCard(data, cardSelector) {
	const card = new Card(data, cardSelector,{handleCardClick:() =>{
		openPopupZoomMesto.open(data.link, data.name);}
	});
	return card.generateCard();
}
// увеличение
 const openPopupZoomMesto = new PopupWithImage(popupZoomSelector);
 openPopupZoomMesto.setEventListeners();

//открытие попапа добавления карточки  где кнопка сохранить
addMestoButton.addEventListener('click',() => {
	popupValidatorMesto.clearError();///при закоменченом активна сохранить
	popupNewPhoto.open();});

//добавление новой карточки photo 
const popupNewPhoto = new PopupWithForm(popupElementPhotoSelector, (evt) => {
	evt.preventDefault();
	const formInputValues = popupNewPhoto.getFormInputValues();
	const item = { name: formInputValues.name_mesto_input, link:formInputValues.link_mesto_input};
	const cardElement = createNewCard(item, cardSelector);
	cards.addItem(cardElement);
	popupNewPhoto.close();
	}
  );
  popupNewPhoto.setEventListeners();
 
//добавление массива элементов при загрузке страницы
const cards = new Section ({
	items:initialCards,
	renderer: (cardItem) => {
		cards.addItem(createNewCard(cardItem, cardSelector));
	}
},'.elements');
cards.renderItems();