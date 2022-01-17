import './pages/index.css';
import { initialCards } from './components/cards';

// ПРОФИЛЬ. ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА, РЕДАКТИРОВАНИЕ

const popup = document.querySelector('.popup')
const profile = document.querySelector('.profile')
const popupEdit = document.querySelector('.popup_type_edit-profile')
const editButton =  profile.querySelector('.profile__edit-button')
const closeEditButton =  popupEdit.querySelector('.popup__close-button')

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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


// Закрытие модального окна по клику на оверлей
document.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target)
  }
})

// Закрытие модального окна нажатием на ESC
document.addEventListener('keydown', function (evt) {
  const openPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(openPopup)
  }
})

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

// модальное окно с просмотром картинки
const popupImage = document.querySelector('.popup_type_image')
const popupPhoto = popupImage.querySelector('.popup__photo')
const popupTitle = popupImage.querySelector('.popup__sightseeing')
const closeImageButton = popupImage.querySelector('.popup__close-button')

closeImageButton.addEventListener('click', () => closePopup(popupImage))


// функция создания карточки
function addCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content // находим темплейт с карточками
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true) // клонируем его

  const imageElement = cardElement.querySelector('.card__photo') // находим элемент картинки
  const titleElement = cardElement.querySelector('.card__sightseeing') // находим элемент названия

  // связываем аргументы функции addCard с атрибутами картинки
  imageElement.src = link
  imageElement.alt = name
  titleElement.textContent = name

  // устанавливаем слушатель события на картинку, открываем ее в попапе
  imageElement.addEventListener('click', function() {
    popupPhoto.src = link
    popupPhoto.alt = name
    popupTitle.textContent = name
    openPopup(popupImage)
  });

  const likeButton = cardElement.querySelector('.card__heart-button') //находим кнопку лайка
  const trashButton = cardElement.querySelector('.card__trash-button') //находим кнопку удаления

  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__heart-button_active'))
  // устанавливаем слушатель события на кнопку лайка

  trashButton.addEventListener('click', () => cardElement.remove())
  // устанавливаем слушатель события на кнопку удаления

  return cardElement //возвращаем готовую карточку
}

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



//VALIDATE.JS

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const showInputError = (inputElement, inputErrorClass, errorElement, errorClass, errorMessage) => {
  inputElement.classList.add(inputErrorClass)
  errorElement.classList.add(errorClass)
  errorElement.textContent = errorMessage
}

const hideInputError = (inputElement, inputErrorClass, errorElement, errorClass) => {
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ""
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  if (inputElement.validity.valid) {
    hideInputError(inputElement, inputErrorClass, errorElement, errorClass)
  } else {
    showInputError(inputElement, inputErrorClass, errorElement, errorClass, inputElement.validationMessage)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector)

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.disabled = false
  }
}

const setEventListeners = (formElement, { inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass)
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
    })
  })

  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
}

const enableValidation = ({ formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector))

  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    setEventListeners(formElement, rest)
  })
}

enableValidation(validationConfig);

