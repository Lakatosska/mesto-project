import './pages/index.css'
import { initialCards, addCard } from './components/cards.js'
import { enableValidation } from './components/validate.js'
import { openPopup, closePopup, popupImage, closeImageButton} from './components/modal.js'




// ПРОФИЛЬ. ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА, РЕДАКТИРОВАНИЕ

const popup = document.querySelector('.popup')
const profile = document.querySelector('.profile')
const popupEdit = document.querySelector('.popup_type_edit-profile')
const editButton =  profile.querySelector('.profile__edit-button')
const closeEditButton =  popupEdit.querySelector('.popup__close-button')

// Находим форму в DOM
const editFormElement = document.querySelector('.form_type_edit-profile')

// Находим поля формы в DOM
const nameInput = editFormElement.querySelector('.form__input_type_name')
const jobInput = editFormElement.querySelector('.form__input_type_job')

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = profile.querySelector('.profile__name')
const profileJob = profile.querySelector('.profile__job')

// Открытие модального окна, поля заполняются значениями, указанными в профиле


editButton.addEventListener('click', () => {
  openPopup(popupEdit)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

// Закрытие модального окна, введенные данные не сохраняются
closeEditButton.addEventListener('click', () => closePopup(popup))

// Обработчик «отправки» формы, введенные данные сохраняются, модальное окно закрывается
function formSubmitHandler (evt) {
  evt.preventDefault()

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(popupEdit)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', formSubmitHandler)

// КАРТОЧКИ + КНОПКА ДОБАВЛЕНИЯ И ЗАКРЫТИЯ, МОДАЛЬНОЕ ОКНО НА ДОБАВЛЕНИЕ И НА ПРОСМОТР




// функция создания карточки function addCard(name, link)
// ПЕРЕНЕСЛА В CARDS.JS

const cardsList = document.querySelector('.cards__list') // находим список для добавления карточек

// проходим по каждой карточке "из коробки" и добавляем в функцию "создания", помещаем в начало списка
initialCards.forEach((item) => cardsList.prepend(addCard(item.name, item.link)))


// ДОБАВЛЕНИЕ КАРТОЧКИ ЧЕРЕЗ МОДАЛЬНОЕ ОКНО

const popupAdd = document.querySelector('.popup_type_add-card')
const addButton = profile.querySelector('.profile__add-button')
const closeAddButton = popupAdd.querySelector('.popup__close-button')
addButton.addEventListener('click', () => openPopup(popupAdd))
closeAddButton.addEventListener('click', () => closePopup(popupAdd))

const addFormElement = document.querySelector('.form_type_add-card')
const cardNameInput = addFormElement.querySelector('.form__input_type_place')
const cardLinkInput = addFormElement.querySelector('.form__input_type_link')

// Обработчик «отправки» формы, введенные данные прогоняются через функцию "создания" и "добавления", модальное окно закрывается, поля очищаются
function addFormSubmitHandler(evt) {
  evt.preventDefault()

  cardsList.prepend(addCard(cardNameInput.value, cardLinkInput.value))
  closePopup(popupAdd)
  addFormElement.reset()
}

// Прикрепляем обработчик к форме
addFormElement.addEventListener('submit', addFormSubmitHandler)





//VALIDATE

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

enableValidation(validationConfig);

