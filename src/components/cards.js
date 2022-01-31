import { openPopup } from "./modal.js"
import { userId } from "./index.js"
import { putLike, deleteLike, deleteCard } from "./api.js"

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

  // возвращает true, если карточки лайкнуты мной (совпадает мой id и id лайкнувших)
  const checkLike = (card) => {
    return card.likes.some(like => like._id === userId)
  }

  if (checkLike(cardData)) {
    likeButton.classList.add('card__heart-button_active')
  }

  likeButton.addEventListener('click', function (evt) {
    if (checkLike(cardData)) {

      deleteLike(cardData._id)
        .then(cardData => {
          likeCounter.textContent = cardData.likes.length
          evt.target.classList.toggle('card__heart-button_active')
        })
        .catch(err => console.log(err))

    } else {

      putLike(cardData._id)
        .then(cardData => {
          likeCounter.textContent = cardData.likes.length
          evt.target.classList.toggle('card__heart-button_active')
        })
        .catch(err => console.log(err))
    }
  })

  return cardElement //возвращаем готовую карточку
}

export { addCard }



