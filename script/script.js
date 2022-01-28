const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
  ];

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
const editFormProfile = editModalProfile.querySelector('.popup__form');
const addFormMesto= addModalMesto.querySelector('.popup__form');


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

//Функция создания карточки элемента в ней- изображение, лайк, корзина удаление.
function createNewCard (newName, newLink) {
	const CardUserElement = cardTemplate.querySelector('.element').cloneNode(true); //получаем клонируем-копируем элемент вместе с содержимым но не добавляем
	const CardElementImage = CardUserElement.querySelector('.element__image');
	CardElementImage.src = newLink;  //записали ссылку и на место встало изображение из массива
	//добавляем в него
	CardUserElement.querySelector('.element__name').textContent = newName; //записали имя в карточку
	CardElementImage.alt = newName;  //записали имя в .element__image alt внутри

	const buttonLike = CardUserElement.querySelector('.element__like');
	//buttonLike.addEventListener('click', like);
	// function like() {
	// 	buttonLike.classList.toggle('element__like_active');
	// }

	//лайк 
	CardUserElement.querySelector('.element__like').addEventListener('click', evt => {
		const buttonLike = evt.target;			//инициатор событитя
		buttonLike.classList.toggle('element__like_active');
	});

	//удаление
	CardUserElement.querySelector('.element__delete').addEventListener('click', () => {
	CardUserElement.remove();
	});

	//открытие попапа с картинкой
	CardElementImage.addEventListener('click', () => {
		toggleModal(popupZoomImage);
		popupZoomImageImg.src = newLink;
		popupZoomImageTitle.textContent = newName;
	});
	return CardUserElement;
}

//обощаем функции модалок
function toggleModal(modal) {
	modal.classList.toggle('popup__open')
}
// //пробуем заемнтить на функцию тоггл 1 2
// function toggleEditModalProfile() {
// 	editModalProfile.classList.toggle('popup__open')
// }

// //пробуем заемнтить на функцию тоггл 3 4
// function toggleAddModalMesto() {
// 	addModalMesto.classList.toggle('popup__open')
// }

editProfileButton.addEventListener('click',function() {
	toggleModal(editModalProfile)
})

closeProfileButton.addEventListener('click',function() {
	toggleModal(editModalProfile)
})

addMestoButton.addEventListener('click',function() {
	toggleModal(addModalMesto)
})

closeMestoButton.addEventListener('click',function() {
	toggleModal(addModalMesto)
})

closeZoomButton.addEventListener('click',function() {
	toggleModal(popupZoomImage)
})
// //или стрелочной описать все 4
// editProfileButton.addEventListener('click',() => toggleModal(editModalProfile))

editFormProfile.addEventListener('submit',(evt) => {
	evt.preventDefault()
profileName.textContent = inputProfileName.value
profileAbout.textContent = inputProfileAbout.value
toggleModal(editModalProfile)
})

addFormMesto.addEventListener('submit',(evt) => {
	evt.preventDefault();
	sectionElements.prepend(createNewCard(inputMestoName.value, inputMestoLink.value));

	toggleModal(addModalMesto)
})

//добавление массива элементов при загрузке страницы
initialCards.forEach(card => {
	sectionElements.append(createNewCard (card.name, card.link)); //добавляем append
});

// //1 клик по кнопке открытие попапа профиля
// editProfileButton.addEventListener('click',() => {
// //console.log ('click', editModalProfile)
// editModalProfile.classList.add ('popup__open')
// })

// //2 клик по кнопке закрытие попапа профиля
// closeProfileButton.addEventListener('click',() => {
// 	//console.log ('click', editModalProfile)
// 	editModalProfile.classList.remove ('popup__open')
// 	})
	

// //3 клик по кнопке открытие попапа mesto
// addMestoButton.addEventListener('click',() => {
// 	//console.log ('click', editModalProfile)
// 	addModalMesto.classList.add ('popup__open')
// 	})
	
// 	//4 клик по кнопке закрытие попапа mesto
// 	closeMestoButton.addEventListener('click',() => {
// 		//console.log ('click', editModalProfile)
// 		addModalMesto.classList.remove('popup__open')
// 		})