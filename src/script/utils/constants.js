export const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__text',
	submitButtonSelector: '.popup__button-save',
	inactiveButtonClass: 'popup__button-save_inacive',
	inputErrorClass: 'popup__text_type_error',
	errorClass: 'popup__error_active'
}

export const popupProfifleSelector = '.popup_profile';
export const popupElementPhotoSelector = '.popup_mesto';

export const buttonAddOpen = document.querySelector('.profile__add-button');
export const cardSelector = '#element';
export const popupZoomSelector = '.popup_zoom'; 
export const popupZoomContainer = document.querySelector('.popup__container_zoom');
export const popupZoomImageImg = popupZoomContainer.querySelector('.popup__image');
export const popupZoomImageTitle = popupZoomContainer.querySelector('.popup__description');
export const inputProfileName = '.profile__name';
export const inputProfileAbout = '.profile__about';


// //переменные для создания элемента
// const sectionElements = document.querySelector('.elements');

// //профиль
// const profileName = document.querySelector('.profile__name')
// const profileAbout = document.querySelector('.profile__about')

// //инпуты
// const inputMestoName = document.querySelector('.popup__text_type_name-mesto');
// const inputMestoLink = document.querySelector('.popup__text_type_link-mesto');
// //const inputProfileName = document.querySelector('.popup__text_type_name')
//const inputProfileAbout = document.querySelector('.popup__text_type_about')

//модалки
export const editModalProfile = document.querySelector('.popup_profile');
export const addModalMesto = document.querySelector('.popup_mesto');

//popup кнопки
export const editProfileButton = document.querySelector('.profile__edit-button');
export const closeProfileButton = editModalProfile.querySelector('.popup__button-close');

// кнопки добавления места
export const addMestoButton = document.querySelector('.profile__add-button');
export const closeMestoButton = addModalMesto.querySelector('.popup__button-close');

// //увеличение фото
// const popupZoomImage = document.querySelector('.popup_zoom')
// //const closeZoomButton = popupZoomImage.querySelector('.popup__button-close')
// //const popupZoomImageImg = popupZoomImage.querySelector('.popup__image')
// //const popupZoomImageTitle = popupZoomImage.querySelector('.popup__description')