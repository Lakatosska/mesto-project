import './index.css';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import {
  config,
  validationConfig,
  userSelectors,
  formSelectors,
  editProfileButton,
  addButton,
  editAvatar,
  nameInput,
  jobInput
} from '../utils/constants.js';



// валидация
const editProfileFormValidator = new FormValidator(
  validationConfig,
  formSelectors.formEditProfile
);

const addCardFormValidator = new FormValidator(
  validationConfig,
  formSelectors.formAddCard
);

const editAvatarFormValidator = new FormValidator(
  validationConfig,
  formSelectors.formEditAvatar
);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();



function handleCardClick(card) {
  popupImage.open(card);
}

function handleDeleteClick(card) {
  api.deleteCard(card.getCardId())
  .then(() => {
  card.removeCard();
  })
  .catch(err => {
    console.log(err);
  })
}

function toggleLike(card) {
  if (!card.isLiked()) {
    api.addLike(card.getCardId())
    .then((cardData) => {
      card.updateLikes(cardData)
    })
    .catch(err => {
      console.log(err);
    })
  } else {
    api.deleteLike(card.getCardId())
    .then((cardData) => {
      card.updateLikes(cardData)
    })
    .catch(err => {
      console.log(err);
    })
  }
}

/*
function toggleLike(card) {
  if (card.isLiked()) {
    api
      .deleteLike(card._cardData._id)
      .then((likes) => {
        card.updateLikes(likes);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  } else {
    api
      .setLike(card._cardData._id)
      .then((likes) => {
        card.updateLikes(likes);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
}
*/


const api = new Api(config);

const userInfo = new UserInfo(
  userSelectors.profileName,
  userSelectors.profileJob,
  userSelectors.profileAvatar
);


const cardList = new Section({
  renderer: (item) => {
    const card = new Card({
      data: item,

      handleCardClick,
      handleDeleteClick,
      toggleLike,

      selector: '#card-template',
      userId: userInfo.getUserInfo().userId,
      });
    return card.generate();
    },
  },
  '.cards__list'
);

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();


const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {

    api
    .editUserData(data.profile__name, data.profile__job)
    .then(userData => {

      userInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
  }
})

popupEditProfile.setEventListeners();


const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_change-avatar',
  handleFormSubmit: (data) => {

    api
    .changeAvatar(data.avatar_link)
    .then(userData => {

      userInfo.setUserInfo(userData);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
  }
})

popupEditAvatar.setEventListeners();


const popupAddCard = new PopupWithForm({
  popupSelector:'.popup_type_add-card',
  handleFormSubmit: (data) =>

    api
    .postNewCard(data.card_name, data.card_link)
    .then(cardData => {
      cardList.addItem(cardData);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
});

popupAddCard.setEventListeners();



// Listeners

editProfileButton.addEventListener('click', () => {
  popupEditProfile.open();

  const currentUser = userInfo.getUserInfo();

  nameInput.value = currentUser.name;
  jobInput.value = currentUser.about;
});

addButton.addEventListener('click', () => {
  popupAddCard.open();
});

editAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
});



api.getAppInfo().then(([userData, cardData]) => {
  userInfo.setUserInfo(userData);
  cardList.renderItems(cardData.reverse());
})
.catch((err) => {
  console.log(`Error: ${err}`);
});



/*
import '../pages/index.css'
import { addCard } from '../components/cards.js'
import { enableValidation } from '../components/validate.js'
import { openPopup, closePopup } from '../components/modal.js'
import { getAppInfo, editUserData, changeAvatar, postNewCard } from '../components/api.js'

export let userId

// КОНСТАНТЫ.РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const profile = document.querySelector('.profile')
const popupProfile = document.querySelector('.popup_type_edit-profile')
const editProfileButton =  profile.querySelector('.profile__edit-button')
// Находим форму и ее поля в DOM
const editProfileFormElement = document.querySelector('.form_type_edit-profile')
const nameInput = editProfileFormElement.querySelector('.form__input_type_name')
const jobInput = editProfileFormElement.querySelector('.form__input_type_job')
// Выбираем элементы, куда должны быть вставлены значения полей
const profileName = profile.querySelector('.profile__name')
const profileJob = profile.querySelector('.profile__job')
// КОНСТАНТЫ.РЕДАКТИРОВАНИЕ АВАТАРА
const popupEditAvatar = document.querySelector('.popup_type_change-avatar')
const editAvatar =  profile.querySelector('.profile__avatar')
// Находим форму и ее поля в DOM
const editAvatarFormElement = document.querySelector('.form_type_change-avatar')
const avatarInput = editAvatarFormElement.querySelector('.form__input_type_link')
// Выбираем элементы, куда должны быть вставлены значения полей
const avatar = profile.querySelector('.profile__avatar-image')
// КОНСТАНТЫ.ДОБАВЛЕНИЕ КАРТОЧКИ ЧЕРЕЗ МОДАЛЬНОЕ ОКНО
const popupAddCard = document.querySelector('.popup_type_add-card')
const addButton = profile.querySelector('.profile__add-button')
const addFormElement = document.querySelector('.form_type_add-card')
const cardNameInput = addFormElement.querySelector('.form__input_type_place')
const cardLinkInput = addFormElement.querySelector('.form__input_type_link')


// получаем данные профиля и карточек для загрузки страницы

getAppInfo()
  .then(([user, cards]) => {
    avatar.src = user.avatar
    profileName.textContent = user.name
    profileJob.textContent = user.about
    userId = user._id
    cards.reverse().forEach(cardData => renderCard(cardData, cardsList, userId))
  })
  .catch(err => console.log(err))


  // обработка карточек с сервера
const cardsList = document.querySelector('.cards__list')

const renderCard = (cardData, cardsList, userId) => {
  const card = addCard(cardData, userId)
  cardsList.prepend(card)
};

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

// открытие модального окна, поля заполняются значениями, указанными в профиле
editProfileButton.addEventListener('click', () => {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

// обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault()

  renderLoading(true, popupProfile)

  editUserData(nameInput.value, jobInput.value)
  .then(res => {
    profileName.textContent = res.name
    profileJob.textContent = res.about
    editProfileFormElement.reset()
    const buttonElement = popupProfile.querySelector('.popup__submit-button')
    buttonElement.disabled = true
    buttonElement.classList.add('popup__submit-button_disabled')
    closePopup(popupProfile)
  })
  .catch(err => console.log(err))
  .finally(() => renderLoading(false, popupProfile))
}

// обработчик для “submit” формы редактирования профиля
editProfileFormElement.addEventListener('submit', handleProfileFormSubmit)


// РЕДАКТИРОВАНИЕ АВАТАРА

// открытие модального окна, поле заполняется ссылкой на текущий аватар
editAvatar.addEventListener('click', () => {
  openPopup(popupEditAvatar)
  avatarInput.value = avatar.textContent
})

// обработчик «отправки» формы  редактирования аватара
function handleEditAvatarFormSubmit (evt) {
  evt.preventDefault()

  renderLoading(true, popupEditAvatar)

  changeAvatar(avatarInput.value)
  .then(res => {
    avatar.src = res.avatar
    editAvatarFormElement.reset()
    const buttonElement = popupEditAvatar.querySelector('.popup__submit-button')
    buttonElement.disabled = true
    buttonElement.classList.add('popup__submit-button_disabled')
    closePopup(popupEditAvatar)
  })
  .catch(err => console.log(err))
  .finally(() => renderLoading(false, popupEditAvatar))
}

// обработчик для “submit” формы редактирования аватара
editAvatarFormElement.addEventListener('submit', handleEditAvatarFormSubmit)


// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

addButton.addEventListener('click', () => openPopup(popupAddCard))

// обработчик «отправки» формы добавления карточки, модальное окно закрывается, поля очищаются
function handleAddCardFormSubmit(evt) {

  evt.preventDefault()
  renderLoading(true, popupAddCard)

  postNewCard(cardNameInput.value, cardLinkInput.value)
  .then(cardData => {
    renderCard(cardData, cardsList, userId)
    addFormElement.reset()
    const buttonElement = popupAddCard.querySelector('.popup__submit-button')
    buttonElement.disabled = true
    buttonElement.classList.add('popup__submit-button_disabled')
    closePopup(popupAddCard)
  })
  .catch(err => console.log(err))
  .finally(() => renderLoading(false, popupAddCard))

}

// Обработчик для “submit” формы добавления карточки
addFormElement.addEventListener('submit', handleAddCardFormSubmit)

// валидация
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

enableValidation(validationConfig)

// loader
const renderLoading = (isLoading, popup) => {
  const popupButton = popup.querySelector('.popup__submit-button')
  if(isLoading){
    popupButton.textContent = 'Сохранение...'
  } else {
    popupButton.textContent = 'Сохранить'
  }
}
*/
