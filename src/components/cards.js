export default class Card {
  constructor({ cardData, handleCardClick, handleLikeClick, handleDeleteClick }, userId, cardSelector) {
      this._id = cardData._id;
      this._name = cardData.name;
      this._link = cardData.link;
      this._likes = cardData.likes;
      this._ownerId = cardData.owner._id;

      this._userId = userId;

      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteClick = handleDeleteClick;

      this._cardSelector = cardSelector;
  }

  // Формирование DOM-элемента карточки
  getView() {
      this._element = this._getTemplate();

      this._element.querySelector('.card__title').textContent = this._name;
      const image = this._element.querySelector('.card__image');
      image.src = this._link;
      image.alt = this._name;
      this._updateLikesView();

      this._setEventListeners();

      return this._element;
  }

  // Удаление карточки из верстки
  remove() {
      this._element.remove();
      this._element = null;
  }

  id() {
      return this._id;
  }

  // Лайкали ли мы карточку
  isLiked() {
      return Boolean(this._likes.find(user => user._id === this._userId));
  }

  // Обновить состояние лайка и счетчика на основе новых данных карточки
  updateLikes(cardData) {
      this._likes = cardData.likes;
      this._updateLikesView();
  }

  // Скопировать DOM-элемент карточки из шаблона
  _getTemplate() {
      return document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.card')
          .cloneNode(true);
  }

  // Навесить всякие слушатели на DOM-элемент карточки
  _setEventListeners() {
      this._element.querySelector('.card__delete-button').addEventListener('click', (event) => {
          this._handleDeleteClick(this); // Внутрь передаем сами себя, чтобы в функции был доступ к методам объекта карточки
      });
      // ....
  }

  // Актуализировать визуал лайка
  _updateLikesView() {
      this._element.querySelector('.card__like-counter').textContent = this._likes.length;
      const like = this._element.querySelector('.card__like');

      if (this.isLiked()) {
          like.classList.add('.card__like_active');
      } else {
          like.classList.remove('.card__like_active');
      }
  }
}




/*
import { openPopup } from "./modal.js"
import { userId } from "../pages/index.js"
import { addLike, deleteLike, deleteCard } from "./api.js"

// константы для модального окна просмотра картинки
const popupImage = document.querySelector('.popup_type_image')
const popupPhoto = popupImage.querySelector('.popup__photo')
const popupTitle = popupImage.querySelector('.popup__sightseeing')


// функция создания карточки
function addCard(cardData, userId) {
  const cardTemplate = document.querySelector('#card-template').content // находим темплейт с карточками
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true) // клонируем его

  const imageElement = cardElement.querySelector('.card__photo') // находим элемент картинки
  const titleElement = cardElement.querySelector('.card__sightseeing') // находим элемент названия
  const likeCounter = cardElement.querySelector('.card__like-count') //находим счетчик лайка

  // связываем аргументы функции addCard с атрибутами картинки
  imageElement.src = cardData.link
  imageElement.alt = cardData.name
  likeCounter.textContent = cardData.likes.length // счетчик лайков
  titleElement.textContent = cardData.name

  // устанавливаем слушатель события на картинку, открываем ее в попапе
  imageElement.addEventListener('click', function() {
    popupPhoto.src = cardData.link
    popupPhoto.alt = cardData.name
    popupTitle.textContent = cardData.name
    openPopup(popupImage)
  });

  const likeButton = cardElement.querySelector('.card__heart-button') //находим кнопку лайка
  const trashButton = cardElement.querySelector('.card__trash-button') //находим кнопку удаления

  // удаляем иконку корзины, если карточки не мои
  if (cardData.owner._id !== userId) trashButton.remove()

  // слушатель "корзины", удаляем карточку
  trashButton.addEventListener('click', (evt) => {
    deleteCard(cardData._id)
    .then(() => evt.target.closest('.card').remove())
    .catch(err => console.log(err))
  })

  // ЛАЙКИ

 // лайкнутые мной сердечки приходят с сервера окрашенными
  cardData.likes.forEach((card) => {
    if(card._id === userId) {
      likeButton.classList.add('card__heart-button_active')
    }
  })

  // обработчик кнопки лайка
  likeButton.addEventListener('click', (evt) => likeCard(likeCounter, evt.target, cardData._id))

  return cardElement //возвращаем готовую карточку
}

// функция поставновки и удаления лайка
const likeCard = (element, button, cardId) => {

  if(button.classList.contains('card__heart-button_active')) {

    deleteLike(cardId)
    .then((res) => {
      element.textContent = res.likes.length
      button.classList.remove('card__heart-button_active')
    })
    .catch(err => console.log(err))

  } else {

    addLike(cardId)
    .then((res) => {
    element.textContent = res.likes.length
    button.classList.add('card__heart-button_active')
  })
  .catch(err => console.log(err))
  }
}


export { addCard }
*/


