export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: 'f4364e86-dc65-4e42-997a-34b37541ff0c',
    'Content-Type': 'application/json'
  }
};

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

export const userSelectors = {
  profileName: '.profile__name',
  profileJob: '.profile__job',
  profileAvatar: '.profile__avatar-image',
};

export const formSelectors = {
  formEditProfile: '.form_type_edit-profile',
  formAddCard: '.form_type_add-card',
  formEditAvatar: '.form_type_change-avatar',
};

export const editProfileButton =  document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const editAvatar =  document.querySelector('.profile__avatar');

export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_job');
