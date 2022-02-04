
// КЛАССЫ ДЛЯ ОШИБОК НАПИСАНЫ
// нужно написать
// 1-Функцию которая добавляяет инпуту класс с ошибкой inputErrorVisible
// 2-Функцию которая удаляет инпуту класс с ошибкой inputErrorInvisible
//3 Функция, которая проверяет валидность заполнения поля validate, в ней по if или 1 или 2
// Функция проверки хотябы олдного невалидного поля???
// Функция замены стиля кнопки сохранить... тоже с if else
// обработчик всех полей- находим поля, создаем массив, получаем кнопку сохранить, активна или нет потом каждому полю проверка на validate
// каждому введенному символу

// 1 как в тренажере
const inputErrorVisible = (formElement, inputElement, errorMessage, {inputError, error}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputError);
  errorElement.textContent = errorMessage;//?
  errorElement.classList.add(error);//?
};

//2ю
const  inputErrorInvisible = (formElement, inputElement, {inputError, error}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputError);
  errorElement.classList.remove(error);
  errorElement.textContent = '';
}; 

// 3
const validate = (inputList) => {
  // return inputList.some((inputElement) => { ПОДУМАТЬ
  //   return !inputElement.validity.valid;
  // })
}; 

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__buttonSave',
    inactiveButton: 'popup__buttonSave_inacive',
    inputError: 'popup__text_type_error',
    error: 'popup__error_active'
  });