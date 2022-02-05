import { openPopup, closePopup } from "./modal.js"
import { userId } from "./index.js"
import { addLike, deleteLike, deleteCard } from "./api.js"

let deleteElem
let deleteId

// константы для модального окна просмотра картинки
const popupImage = document.querySelector('.popup_type_image')
const popupPhoto = popupImage.querySelector('.popup__photo')
const popupTitle = popupImage.querySelector('.popup__sightseeing')

// попап подтверждения удаления карточки
const popupConfirm = document.querySelector('.popup_type_confirm')


// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
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
  })

  const likeButton = cardElement.querySelector('.card__heart-button') //находим кнопку лайка
  const trashButton = cardElement.querySelector('.card__trash-button') //находим кнопку удаления

  // удаляем иконку корзины, если карточки не мои
  if (cardData.owner._id !== userId) {
    trashButton.remove()}

    // слушатель "корзины", удаляем карточку
  trashButton.addEventListener('click', (evt) => {
    deleteElem = evt.target.closest('.card')
    deleteId = cardData._id
    openPopup(popupConfirm)

})

  const buttonElement = popupConfirm.querySelector('.popup__submit-button')

  // удаляем карточку из попапа
  buttonElement.addEventListener('click', deleteCardByButton)


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

// функция удаления карточки
function deleteCardByButton() {
  deleteCard(deleteId)
  .then(() => {
    deleteElem.remove();
    closePopup(popupConfirm);
  })
  .catch((err) => {
    console.log(err);
  })
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

/*
const confirmDeleteCard = (popup, cardId) => {
  deleteCard(cardId)
  .then(() => evt.target.closest('.card').remove())
    closePopup(popup)
  .catch(err => console.log(err))
}
*/

export { addCard }



