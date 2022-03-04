import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {

    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  close() {
    super.close();
    this._form.reset();
  }

  //собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    // + обработчик сабмита формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._getInputValues()
      this._handleFormSubmit(this._getInputValues())
    })
  }
}
