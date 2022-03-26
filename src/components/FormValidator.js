export default class FormValidator {
  constructor(
    {
      formSelector,
      errorClass,
      inputSelector,
      inputErrorClass,
      submitButtonSelector,
      inactiveButtonClass,
    },
    form
  ) {
    this._form = document.querySelector(`${form}`);
    this._formSelector = formSelector;
    this._errorClass = errorClass;
    this._inputSelector = inputSelector;
    this._inputErrorClass = inputErrorClass;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListener();
  }

  resetValidation() {
    this._toggleButtonState();
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _setDisabledButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  _removeDisabledButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled');
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._setDisabledButton();
    } else {
      this._removeDisabledButton();
    }
  }

  _showErrorMessage(errorElement, input) {
    errorElement.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideErrorMessage(errorElement, input) {
    errorElement.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _handlerInputValidity(errorElement, input) {
    if (!input.validity.valid) {
      this._showErrorMessage(errorElement, input);
    } else {
      this._hideErrorMessage(errorElement, input);
    }
  }

  _setEventListener() {
    this._inputs.forEach((input) => {
      const errorElement = this._form.querySelector(`.${input.id}-error`);
      input.addEventListener('input', () => {
        this._handlerInputValidity(errorElement, input);
        this._toggleButtonState();
      });

      this._form.addEventListener('reset', () => {
        this._setDisabledButton();
        this._hideErrorMessage(errorElement, input);
      });

    });
  }
}
