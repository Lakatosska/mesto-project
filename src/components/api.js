const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// получение данных профиля с сервера
function getInitialProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
}

// получение карточек с сервера
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
}

// редактирование профиля
function editUserData(name, about) {
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
function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse)
}

// удалить лайк
function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}

// удалить карточку
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}




// данные профиля с сервера - вывожу в консоль
fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
  })
  .then(res => res.json())
  .then((res) => {
    console.log(res);
});


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


export { config, checkResponse, getInitialProfile, getInitialCards, editUserData, changeAvatar, postNewCard, putLike, deleteLike, deleteCard }
