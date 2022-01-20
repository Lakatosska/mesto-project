import '../pages/index.css'
import { initialCards, addCard } from './cards.js'
import { enableValidation } from './validate.js'
import { openPopup, closePopup } from './modal.js'
import { config } from './api.js'


// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

const profile = document.querySelector('.profile')
const popupProfile = document.querySelector('.popup_type_edit-profile')
const editButton =  profile.querySelector('.profile__edit-button')

// Находим форму и ее поля в DOM
const editFormElement = document.querySelector('.form_type_edit-profile')
const nameInput = editFormElement.querySelector('.form__input_type_name')
const jobInput = editFormElement.querySelector('.form__input_type_job')

// Выбираем элементы, куда должны быть вставлены значения полей
const profileName = profile.querySelector('.profile__name')
const profileJob = profile.querySelector('.profile__job')

// Открытие модального окна, поля заполняются значениями, указанными в профиле
editButton.addEventListener('click', () => {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

// Обработчик «отправки» формы, введенные данные сохраняются, модальное окно закрывается
function handleProfileFormSubmit (evt) {
  evt.preventDefault()

  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(popupProfile)
}

//  Обработчик для “submit” формы редактирования профиля
editFormElement.addEventListener('submit', handleProfileFormSubmit)


// ДОБАВЛЕНИЕ КАРТОЧЕК "ИЗ КОРОБКИ"

const cardsList = document.querySelector('.cards__list')
initialCards.forEach((item) => cardsList.prepend(addCard(item.name, item.link)))


// ДОБАВЛЕНИЕ КАРТОЧКИ ЧЕРЕЗ МОДАЛЬНОЕ ОКНО

const popupAddCard = document.querySelector('.popup_type_add-card')
const addButton = profile.querySelector('.profile__add-button')
addButton.addEventListener('click', () => openPopup(popupAddCard))

const addFormElement = document.querySelector('.form_type_add-card')
const cardNameInput = addFormElement.querySelector('.form__input_type_place')
const cardLinkInput = addFormElement.querySelector('.form__input_type_link')

// Обработчик «отправки» формы, введенные данные прогоняются через функцию "создания" и "добавления", модальное окно закрывается, поля очищаются
function handleAddCardFormSubmit(evt) {
  evt.preventDefault()

  cardsList.prepend(addCard(cardNameInput.value, cardLinkInput.value))
  closePopup(popupAddCard)
  addFormElement.reset()

  const buttonElement = popupAddCard.querySelector('.popup__submit-button')
  buttonElement.disabled = true
  buttonElement.classList.add('popup__submit-button_disabled')
}

// Обработчик для “submit” формы добавления карточки
addFormElement.addEventListener('submit', handleAddCardFormSubmit)


// ВАЛИДАЦИЯ

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

enableValidation(validationConfig);


// СЕРВЕР

// данные профиля с сервера
fetch('https://nomoreparties.co/v1/plus-cohort-6/users/me', {
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c'
  }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

//редактируем данные пользователя



fetch('https://nomoreparties.co/v1/plus-cohort-6/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: profileName,
    about: profileJob
  })
});

// карточки с сервера
  fetch('https://nomoreparties.co/v1/plus-cohort-6/cards', {
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
