
// Находим форму в DOM
let formElement = document.querySelector('.popup__input');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name');
let jobInput  = formElement.querySelector('.popup__about');


let editProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeProfile = document.querySelector('.popup__buttonClose');


// Поля из Профиля
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');


//Открываем форму

function openForm() {
	popup.classList.add('popup__open');
	nameInput.value=profileName.textContent;
	jobInput.value=profileAbout.textContent;
}

//Закрываем форму
function closeForm() {
	popup.classList.remove('popup__open');
}

// Обработчик "Отправки формы"
function formSubmitHandler(evt) {
	evt.preventDefault();    // Эта строчка отменяет стандартную отправку формы.
	
	profileName.textContent=nameInput.value;    // Получите значение полей jobInput и nameInput из свойства value
	profileAbout.textContent=jobInput.value;     // Вставьте новые значения с помощью textContent
	popup.classList.remove('popup__open');
}
formElement.addEventListener('submit', formSubmitHandler);
editProfile.addEventListener('click', openForm);
closeProfile.addEventListener('click', closeForm);


