function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
}

// Закрытие модального окна по клику на оверлей
document.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target)
  }
})

// Закрытие модального окна нажатием на ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

// модальное окно с просмотром картинки
const popupImage = document.querySelector('.popup_type_image')
const popupPhoto = popupImage.querySelector('.popup__photo')
const popupTitle = popupImage.querySelector('.popup__sightseeing')
const closeImageButton = popupImage.querySelector('.popup__close-button')

// слушатель - закрытие модального окна с картинкой
closeImageButton.addEventListener('click', () => closePopup(popupImage))


export { openPopup, closePopup, popupImage, popupPhoto, popupTitle, closeImageButton }
