const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c',
    'Content-Type': 'application/json'
  }
}

// функция проверки ответа
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

// функция загрузки данных для профиля и карточек
const getAppInfo = () => {
  return Promise.all([getInitialProfile(), getInitialCards()])
}

// получение данных профиля с сервера
const getInitialProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
}

// получение карточек с сервера
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
}

// редактирование профиля
const editUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
  .then(checkResponse)
}

// редактирование аватара
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

// добавление новой карточки
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

// поставить лайк
const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse)
}

// удалить лайк
const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}

// удалить карточку
const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}


export { config, checkResponse, getAppInfo, editUserData, changeAvatar, postNewCard, addLike, deleteLike, deleteCard }
