import { openPopup } from "./modal.js"
import { userId } from "./index.js"
import { putLike, deleteLike, deleteCard } from "./api.js"

// константы для модального окна просмотра картинки
const popupImage = document.querySelector('.popup_type_image')
const popupPhoto = popupImage.querySelector('.popup__photo')
const popupTitle = popupImage.querySelector('.popup__sightseeing')

// функция возвращает карточки, которые лайкнуты мной
function checkLike(card) {
  return card.likes.some(like => like._id === userId);
}

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

  // удаляем иконку корзины, если карточки не мои
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





