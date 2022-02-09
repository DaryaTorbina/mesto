// Функция добавляющая инпуту класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция удаляющая у инпута класс с ошибкой
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
 }; 

// Функция проверяющая валидность заполнения поля
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}; 

// Функция, которая проверяет наличие хотя бы одного невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
     // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
     // сделай кнопку неактивной
    buttonElement.classList.add('popup__button-save_inacive');
     buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button-save_inacive');
    buttonElement.disabled = false;
  }
};
//окончательно запуталась, и не получается сделать по рекомендации.
//поскольку сроки сдачи работы прошли,функционал реализован,сдаю так. Буду распутывать себя дальше, а сейчас сдаю так.
//снять ошибку при закрытии
//комментарий
// Эта функция относится к валидации, поэтому ее нужно объявлять  внутри модуля валидации. 
//А в index.js вызывать, передав ему нужные аргументы. Поиск нужных для вызова функции элементов 
//(inputList, errorList)  можно оставить в index.js

function clearError(popupActive) {
	const inputList = Array.from(popupActive.querySelectorAll('.popup__text_type_error'));
	if (inputList.length!==0) {
		 const errorList = Array.from(popupActive.querySelectorAll('.popup__error_active'));
		inputList.forEach((inputElement) => {
			inputElement.classList.remove('popup__text_type_error');
		});
		errorList.forEach((errorElement) => {
			errorElement.classList.remove('popup__error_active');
			errorElement.textContent = '';
		});
	}
};

//обработчик для всех полей
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...config}) => {
  // Находим все поля внутри формы, делаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);
  //кнопка "Сохранить" неактивна 
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, config);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input и вызовем функцию isValid
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid передаем ей форму и проверяемый элемент
      isValid(formElement, inputElement, config);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}; 

//обработчик для всех форм
const enableValidation = ({formSelector, ...config}) => {
  // Найдём все формы с указанным классом, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, config);
  });
};




enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__text',
	submitButtonSelector: '.popup__button-save',
	inactiveButtonClass: 'popup__button-save_inacive',
	inputErrorClass: 'popup__text_type_error',
	errorClass: 'popup__error_active'
  });