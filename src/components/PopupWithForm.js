import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {

    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.form__input');

  }

  close() {
    super.close();
    this._form.reset();

  }

  setEventListeners() {
    super.setEventListeners();
    // + обработчик сабмита формы
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault;
      this._handleFormSubmit(this._getInputValues)

    })
  }

  //собирает данные всех полей формы
  _getInputValues() {

    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }


}

/*
Создайте класс PopupWithForm, который наследуется от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm
должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/
