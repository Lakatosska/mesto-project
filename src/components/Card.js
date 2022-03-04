export default class Card {
  constructor({
    data,
    handleCardClick,
    handleDeleteClick,
    toggleLike,
    selector,
    userId
  }) {
    this._cardData = data;
    this._likes = data.likes;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._toggleLike = toggleLike;
    this._userId = userId;
  }

  generate() {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector('.card__photo');
    this._cardTitle = this._element.querySelector('.card__sightseeing');

    this._trashButton = this._element.querySelector('.card__trash-button');
    this._likeCounter = this._element.querySelector('.card__like-count');

    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._cardTitle.textContent = this._cardData.name;

    this._updateLikesView();
    this._showTrashButton();
    this._setEventListeners();

    return this._element;
  }

  getCardId() {
    return this._cardData._id;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
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

  // Актуализировать визуал лайка
  _updateLikesView() {
    this._likeCounter.textContent = this._likes.length;
    this._like = this._element.querySelector('.card__heart-button');

    if (this.isLiked()) {
        this._like.classList.add('card__heart-button_active');
    } else {
        this._like.classList.remove('card__heart-button_active');
    }
  }

  _showTrashButton() {
    if (this._cardData.owner._id !== this._userId) {
      this._trashButton.remove();
    }
  }

  _getElement() {
    const templateCard = document.querySelector(this._selector);
    return templateCard.content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick({
      image: this._cardImage.src,
      title: this._cardTitle.textContent,
      })
    )

    this._trashButton.addEventListener('click', () => {
      this._handleDeleteClick(this); // Внутрь передаем сами себя, чтобы в функции был доступ к методам объекта карточки
    })

    this._like.addEventListener('click', () => {
      this._toggleLike(this);
    })
  }
}
