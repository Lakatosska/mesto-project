export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c',
    'Content-Type': 'application/json'
  }
};

export const userSelectors = {
  profileName: '.profile__name',
  profileJob: '.profile__job',
  profileAvatar: '.profile__avatar-image',
};

export const editProfileButton =  document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const editAvatar =  document.querySelector('.profile__avatar');
