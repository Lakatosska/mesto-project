import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {

    super(popupSelector);

    this._title = this._popup.querySelector('.popup__photo');
    this._image = this._popup.querySelector('.popup__sightseeing');

  }

  open(card) {
    this._title.textContent = card.title;
    this._image.src = card.image;
    this._image.alt = card.title;
  }

}

//В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
