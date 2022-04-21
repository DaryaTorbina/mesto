import { initialCards } from "./InitialCards.js";
import {FormValidator} from "./FormValidator.js";
import { Card } from "./Card.js";

//переменные для создания элемента
const sectionElements = document.querySelector('.elements');

//профиль
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

//инпуты
const inputMestoName = document.querySelector('.popup__text_type_name-mesto');
const inputMestoLink = document.querySelector('.popup__text_type_link-mesto');
const inputProfileName = document.querySelector('.popup__text_type_name')
const inputProfileAbout = document.querySelector('.popup__text_type_about')

//модалки
const editModalProfile = document.querySelector('.popup_profile');
const addModalMesto = document.querySelector('.popup_mesto');

//popup кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = editModalProfile.querySelector('.popup__button-close');

// кнопки добавления места
const addMestoButton = document.querySelector('.profile__add-button');
const closeMestoButton = addModalMesto.querySelector('.popup__button-close');

//увеличение фото
const popupZoomImage = document.querySelector('.popup_zoom')
const closeZoomButton = popupZoomImage.querySelector('.popup__button-close')
const popupZoomImageImg = popupZoomImage.querySelector('.popup__image')
const popupZoomImageTitle = popupZoomImage.querySelector('.popup__description')

const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__text',
	submitButtonSelector: '.popup__button-save',
	inactiveButtonClass: 'popup__button-save_inacive',
	inputErrorClass: 'popup__text_type_error',
	errorClass: 'popup__error_active'
}

// пеерменные для подключения валидации к попапу профиля и места
const popupValidatorProfile = new FormValidator(config, editModalProfile);
const  popupValidatorMesto = new FormValidator(config, addModalMesto);

/// показывает ошибки
popupValidatorProfile.enableValidation();
popupValidatorMesto.enableValidation();

//функции открытия и закрытия попапа
function openPopup (popup) {
	popup.classList.add('popup__open'); 
	document.addEventListener('keydown', closePopupEsc);
	document.addEventListener('click', closePopupOverlay);
} 

function closePopup (popup) {
	popup.classList.remove('popup__open'); 
	document.removeEventListener('keydown', closePopupEsc);
	document.removeEventListener('mousedown', closePopupOverlay);//click
} 

//функция закрытия попапа по клику на оверлей
const closePopupOverlay = (evt) => {
	if (evt.target.classList.contains('popup__open')) {
	  closePopup(evt.target); 
	};
  };
  
  //функция закрытия попапа по клику на esc
  const closePopupEsc = (evt) => {
	if (evt.key === 'Escape') {
	  const popupOpened = document.querySelector('.popup__open');
	  closePopup(popupOpened);
	};
  };

//ПРОФИЛЬ

//редактирование профиля
function editProfile(evt) {
	evt.preventDefault();
	profileName.textContent = inputProfileName.value;
	profileAbout.textContent = inputProfileAbout.value;
	closePopup(editModalProfile);
}

//открытие попапа профиля
editProfileButton.addEventListener('click', () => {
	openPopup(editModalProfile);
	inputProfileName.value = profileName.textContent;
	inputProfileAbout.value = profileAbout.textContent;
	popupValidatorProfile.clearError();
});

//закрытие попапа профиля
closeProfileButton.addEventListener('click',() => {
	closePopup(editModalProfile);
});

//редактирование профиля
editModalProfile.addEventListener('submit',editProfile);

//ДЕЙСТВИЯ С КАРТОЧКАМИ

//функция создания карточки
function createNewCard(data, cardSelector) {
	const card = new Card(data, cardSelector, openPopupZoomMesto);
	const cardElement = card.generateCard();
	return cardElement;
}

//открытие попапа с картинкой для класса Card
function openPopupZoomMesto(name, link) {
	popupZoomImageImg.src = link;
	popupZoomImageImg.alt = name;
	popupZoomImageTitle.textContent = name;
	openPopup(popupZoomImage);
};

//добавление
function addMestoCard (evt) {
	evt.preventDefault();
	const dataCard =
	{
		name: inputMestoName.value,
		link: inputMestoLink.value
	}
	sectionElements.prepend(createNewCard(dataCard, "#element"));
	closePopup(addModalMesto);
};

//редактирование карточки
 addModalMesto.addEventListener('submit',addMestoCard);

//открытие попапа карточки 
addMestoButton.addEventListener('click',() => {
	openPopup(addModalMesto);
	inputMestoName.value = ''; 
	inputMestoLink.value = '';
	popupValidatorMesto.clearError();
 });

//закрытие карточки
closeMestoButton.addEventListener('click',() => {
	closePopup(addModalMesto);
});

//увеличение фото-карточки закрытие
closeZoomButton.addEventListener('click',() => {
	closePopup(popupZoomImage);
})

// добавление массива элементов при загрузке страницы
initialCards.forEach( item => {
		sectionElements.append(createNewCard (item, '#element')); //добавляем append
	});
