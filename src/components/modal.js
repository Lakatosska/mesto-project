// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
}

// закрытие модального окна по клику на крестик и на оверлей
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})

// закрытие модального окна нажатием на ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}


export { openPopup, closePopup }
