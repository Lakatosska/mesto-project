import { openPopup, popupImage, popupPhoto, popupTitle } from "./modal.js"
import { userId, checkResponse } from "./index.js"
import { config } from "./api.js"

/*
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
*/

console.log(userId)

// функция создания карточки
export function addCard(name, link, data) {
  const cardTemplate = document.querySelector('#card-template').content // находим темплейт с карточками
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true) // клонируем его

  const imageElement = cardElement.querySelector('.card__photo') // находим элемент картинки
  const titleElement = cardElement.querySelector('.card__sightseeing') // находим элемент названия
  const likeCounter = cardElement.querySelector('.card__like-count') //находим счетчик лайка

  // связываем аргументы функции addCard с атрибутами картинки
  imageElement.src = link
  imageElement.alt = name
  likeCounter.textContent = data.likes.length
  titleElement.textContent = name
  console.log(userId)

  // устанавливаем слушатель события на картинку, открываем ее в попапе
  imageElement.addEventListener('click', function() {
    popupPhoto.src = link
    popupPhoto.alt = name
    popupTitle.textContent = name
    openPopup(popupImage)
  });

  const likeButton = cardElement.querySelector('.card__heart-button') //находим кнопку лайка
  const trashButton = cardElement.querySelector('.card__trash-button') //находим кнопку удаления


  if (data.owner._id !== userId) trashButton.remove()

  trashButton.addEventListener('click', (evt) => {
    deleteCard(data._id)
    .then(() => {
      evt.target.closest('.card').remove()
    })
    .catch((err) => {
      console.log(`Error: ${err}`)
    })
  })

  // ЛАЙКИ

  if (checkLike(data)) {
    likeButton.classList.add('card__heart-button_active')
  }

  likeButton.addEventListener('click', function (evt) {
    if (checkLike(data)) {

      deleteLike(data._id)
        .then((data) => {
          likeCounter.textContent = data.likes.length
          evt.target.classList.toggle('card__heart-button_active')
        })
        .catch((err) => {
          console.log(err)
        });

    } else {

      putLike(data._id)
        .then((data) => {
          likeCounter.textContent = data.likes.length
          evt.target.classList.toggle('card__heart-button_active')
        })
        .catch((err) => {
          console.log(err)
        });
    }
  });

  return cardElement //возвращаем готовую карточку
}

// поставить лайк
function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse)
}

// поставить лайк
function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}

function checkLike(card) {
  return card.likes.some(like => like._id === userId);
}

// удалить карточку
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}
// deleteCard()
//f.ex. deleteCard('61ef120d5d721101810ab019')


