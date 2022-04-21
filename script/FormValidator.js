
class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    //this._element = document.querySelector(`.${formElement}`);
   
  }

  // Функция проверяющая валидность заполнения поля
// const isValid = (formElement, inputElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// }; 
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
// Функция добавляющая инпуту класс с ошибкой
// const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
//   // Находим элемент ошибки
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };


  _showInputError = (inputElement, errorMessage) => {
		inputElement.classList.add(this._inputErrorClass);
		this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		this._errorElement.classList.add(this._errorClass);
		this._errorElement.textContent = errorMessage;
	};


  // // Функция удаляющая у инпута класс с ошибкой
// const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
//  }; 
	//снять ошибку
	_hideInputError = (inputElement) => {
		inputElement.classList.remove(this._inputErrorClass);
		this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		this._errorElement.classList.remove(this._errorClass);
	this._errorElement.textContent = '';
	};

// // Функция принимает массив полей ввода
// // и элемент кнопки, состояние которой нужно менять
// const toggleButtonState = (inputList, buttonElement,config) => {
//   // Если есть хотя бы один невалидный инпут
// if (hasInvalidInput(inputList)) {
//   // сделай кнопку неактивной
//  buttonElement.classList.add(config.inactiveButtonClass);
//   buttonElement.disabled = true;
// } else {
//  // иначе сделай кнопку активной
//  buttonElement.classList.remove(config.inactiveButtonClass);
//  buttonElement.disabled = false;
// }
// };
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

//   // Функция, которая проверяет наличие хотя бы одного невалидного поля
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }; 
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


//обработчик для всех полей
// const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...config}) => {
//   // Находим все поля внутри формы, делаем из них массив методом Array.from
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//     // Найдём в текущей форме кнопку отправки
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   //кнопка "Сохранить" неактивна 
//   // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
//   toggleButtonState(inputList, buttonElement, config);
//   // Обойдём все элементы полученной коллекции
//   inputList.forEach((inputElement) => {
//     // каждому полю добавим обработчик события input и вызовем функцию isValid
//     inputElement.addEventListener('input', () => {
//       // Внутри колбэка вызовем isValid передаем ей форму и проверяемый элемент
//       isValid(formElement, inputElement, config);
//         // Вызовем toggleButtonState и передадим ей массив полей и кнопку
//       toggleButtonState(inputList, buttonElement, config);
//     });
//   });
// }; 


  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }


  //обработчик для всех форм
// const enableValidation = ({formSelector, ...config}) => {
//   // Найдём все формы с указанным классом, сделаем из них массив методом Array.from
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   // Переберём полученную коллекцию
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
//     setEventListeners(formElement, config);
//   });
// };

  enableValidation() {
    this._setEventListeners();
  }




// снять ошибку при закрытии
clearError(){
 this._toggleButtonState(); 
this._inputList.forEach((inputElement) => {
  this._hideInputError(inputElement)
});
} 
} 



export {FormValidator};

