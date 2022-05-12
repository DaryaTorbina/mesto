class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  // Функция проверяющая валидность заполнения поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Функция добавляющая инпуту класс с ошибкой
  _showInputError = (inputElement, errorMessage) => {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = errorMessage;
  };

  // Функция удаляющая у инпута класс с ошибкой
  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Функция, которая проверяет наличие хотя бы одного невалидного поля
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //обработчик для всех полей
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //обработчик для всех форм
  enableValidation() {
    this._setEventListeners();
  }

  // снять ошибку при закрытии
  clearError() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

export { FormValidator };
