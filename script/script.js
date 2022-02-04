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

//форма
const editFormProfile = editModalProfile.querySelector('.popup__form1');
const addFormMesto= addModalMesto.querySelector('.popup__form1');


//popup кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = editModalProfile.querySelector('.popup__buttonClose');

// кнопки добавления места
const addMestoButton = document.querySelector('.profile__add-button');
const closeMestoButton = addModalMesto.querySelector('.popup__buttonClose');

//увеличение фото
const popupZoomImage = document.querySelector('.popup_zoom')
const closeZoomButton = popupZoomImage.querySelector('.popup__buttonClose')
const popupZoomImageImg = popupZoomImage.querySelector('.popup__image')
const popupZoomImageTitle = popupZoomImage.querySelector('.popup__description')

//функции открытия и закрытия попапа
function openPopup (popup) {
	popup.classList.add('popup__open'); 
	document.addEventListener('keydown', popupCloseEsc);
	document.addEventListener('click', popupCloseOverlay);
} 

function closePopup (popup) {
	popup.classList.remove('popup__open'); 
	document.removeEventListener('keydown', popupCloseEsc);
	document.removeEventListener('click', popupCloseOverlay);
} 

//функция закрытия попапа по клику на оверлей
const popupCloseOverlay = (evt) => {
	if (evt.target.classList.contains('popup__open')) {
	  closePopup(evt.target); 
	};
  };
  
  //функция закрытия попапа по клику на esc
  const popupCloseEsc = (evt) => {
	if (evt.key === 'Escape') {
	  const popupOpened = document.querySelector('.popup__open');
	  closePopup(popupOpened);
	};
  };



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
});

//клик по кнопке открытие попапа профиля
editProfileButton.addEventListener('click',() => {
		openPopup(editModalProfile);
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


 


// //функция закрыпия попапа по Esc
// function closePopupEsc(evt) {
// 	if (evt.key==='Escape') {
// 		  const popupOpened = document.querySelector('.popup__open');
// 		  closePopup(popupOpened);
// 	  }
//   }

  
// //функция закрыпия попапа по нажатию на Overlay
// function closePopupOverlay(evt) {
// 	if (evt.target.classList.contains('popup__open')) {
// 		  const popupOpened = document.querySelector('.popup__open');
// 		  closePopup(popupOpened);
// 	  }
//   }



//добавление массива элементов при загрузке страницы
initialCards.forEach(card => {
	sectionElements.append(createNewCard (card.name, card.link)); //добавляем append
});