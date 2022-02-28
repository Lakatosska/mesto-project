export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    console.log('fff')
  }

  _handleEscClose() {
    console.log('fff')
  }
}
