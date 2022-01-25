import '../pages/index.css'
import { addCard } from './cards.js'
import { enableValidation } from './validate.js'
import { openPopup, closePopup } from './modal.js'
import { config } from './api.js'

export let userId
console.log(userId)


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

// ДОБАВЛЕНИЕ КАРТОЧКИ ЧЕРЕЗ МОДАЛЬНОЕ ОКНО

const popupAddCard = document.querySelector('.popup_type_add-card')
const addButton = profile.querySelector('.profile__add-button')
addButton.addEventListener('click', () => openPopup(popupAddCard))

const addFormElement = document.querySelector('.form_type_add-card')
const cardNameInput = addFormElement.querySelector('.form__input_type_place')
const cardLinkInput = addFormElement.querySelector('.form__input_type_link')


const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse)
}
// postNewCard()


// удалить карточку
const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}
// deleteCard()
//f.ex. deleteCard('61ef120d5d721101810ab019')


// Обработчик «отправки» формы, модальное окно закрывается, поля очищаются
function handleAddCardFormSubmit(evt) {
  evt.preventDefault()

  postNewCard(cardNameInput.value, cardLinkInput.value)

  .then(checkResponse)
  .then((res) => {
    renderCard(res)
  })

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

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}



/*

//редактируем данные пользователя
fetch('https://nomoreparties.co/v1/plus-cohort-6/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: profileName,
    about: profileJob,
    avatar: avatar
  })
});
*/

// данные профиля с сервера
fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
  })
  .then(res => res.json())
  .then((res) => {
    console.log(res);
});


// получаем данные профиля с сервера (пока кроме аватара)
const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
  .then((res) => {
    //console.log(result)
    //nameInput.value = result.name
    //jobInput.value = result.about
    //avatar.src = result.avatar
    profileName.textContent = res.name
    profileJob.textContent = res.about
    userId = res._id
  })
}
getProfileData()

// аватар
const avatar = document.querySelector('.profile__avatar')



/*
const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers:config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(checkResponse)
}


function updateAvatar(link){
  const body = JSON.stringify({avatar:link});
  return sendRequest(`${config.baseUrl}/users/me/avatar`, 'PATCH', body);
}

updateAvatar("https://live.staticflickr.com/65535/51835354195_1f5cf12686_m.jpg")
*/


// карточки с сервера

const cardsList = document.querySelector('.cards__list')
const renderCard = (cardElement) => cardsList.append(cardElement)

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
  .then (cards => {
    cards.forEach(card => renderCard(addCard(card.name, card.link, card.likes, card.owner)))
  })

}

getInitialCards()





// данные профилей когорты с сервера - вывожу в консоль
fetch('https://nomoreparties.co/v1/plus-cohort-6/users/', {
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c'
  }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
});


// карточки с сервера - вывожу в консоль
fetch('https://nomoreparties.co/v1/plus-cohort-6/cards', {
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
});



