//переменные для создания элемента
const sectionElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element').content;

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

// новые константы НОВЫЕ пеерменные после ревью
const inputList = Array.from(document.querySelectorAll('.popup__text')); 
const buttonElement = addModalMesto.querySelector('.popup__button-save');

const config ={
	formSelector: '.popup__form',
	inputSelector: '.popup__text',
	submitButtonSelector: '.popup__button-save',
	inactiveButtonClass: 'popup__button-save_inacive',
	inputErrorClass: 'popup__text_type_error',
	errorClass: 'popup__error_active'
  }



//функции открытия и закрытия попапа
function openPopup (popup) {
	popup.classList.add('popup__open'); 
	document.addEventListener('keydown', closePopupEsc);
	document.addEventListener('click', closePopupOverlay);
} 

function closePopup (popup) {
	popup.classList.remove('popup__open'); 
	document.removeEventListener('keydown', closePopupEsc);
	document.removeEventListener('click', closePopupOverlay);
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

//редактирование профиля
function editProfile() {
	profileName.textContent = inputProfileName.value;
	profileAbout.textContent = inputProfileAbout.value;
	closePopup(editModalProfile);
}

//открытие попапа профиля
editProfileButton.addEventListener('click', () => {
	openPopup(editModalProfile);
	inputProfileName.value = profileName.textContent;
	inputProfileAbout.value = profileAbout.textContent;
	//clearError(editModalProfile);//для 1 варианта функции
	clearError(editModalProfile, config);//для 2 варианта функции
	toggleButtonState(inputList,buttonElement,config);
});

//закрытие попапа профиля
closeProfileButton.addEventListener('click',() => {
	closePopup(editModalProfile);
});

//редактирование профиля
editModalProfile.addEventListener('submit',editProfile);

//действия с карточками
//открытие попапа карточки 
addMestoButton.addEventListener('click',() => {
	openPopup(addModalMesto);
	inputMestoName.value = ''; 
	inputMestoLink.value = '';
	//clearError(addModalMesto);//для 1 варианта функции
	clearError(addModalMesto, config);//для 2 варианта функции
	toggleButtonState(inputList,buttonElement,config);
 });

//закрытие
closeMestoButton.addEventListener('click',() => {
	closePopup(addModalMesto);
});

//добавление
function addMestoCard (evt) {
	evt.preventDefault();
	sectionElements.prepend(createNewCard(inputMestoName.value, inputMestoLink.value));
	closePopup(addModalMesto);
};

addModalMesto.addEventListener('submit',addMestoCard);

//Функция создания карточки элемента в ней- изображение, лайк, корзина удаление.
//можно лучше в функцию создания карточки передавать её данные как объект/вынести поиск элементов в переменные
function createNewCard (newName, newLink) {
	
	const cardUserElement = cardTemplate.querySelector('.element').cloneNode(true); //получаем клонируем-копируем элемент вместе с содержимым но не добавляем
	const cardElementImage = cardUserElement.querySelector('.element__image');
	cardElementImage.src = newLink;  //записали ссылку и на место встало изображение из массива
	//добавляем в него
	cardUserElement.querySelector('.element__name').textContent = newName; //записали имя в карточку
	cardElementImage.alt = newName;  //записали имя в .element__image alt внутри
	
	//лайк 
	cardUserElement.querySelector('.element__like').addEventListener('click', evt => {
		const buttonLike = evt.target;			//инициатор событитя
		buttonLike.classList.toggle('element__like_active');
	});

	//удаление
	cardUserElement.querySelector('.element__delete').addEventListener('click', () => {
	cardUserElement.remove();
	});

	//открытие попапа с картинкой
	cardElementImage.addEventListener('click', () => {
		openPopup(popupZoomImage);
		popupZoomImageImg.src = newLink;
		popupZoomImageTitle.textContent = newName;
		popupZoomImageImg.alt = newName;

	});
	return cardUserElement;
}


//увеличение фото-карточки закрытие
closeZoomButton.addEventListener('click',() => {
	closePopup(popupZoomImage);
})


//добавление массива элементов при загрузке страницы
initialCards.forEach(card => {
	sectionElements.append(createNewCard (card.name, card.link)); //добавляем append
});
