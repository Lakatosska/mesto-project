import './index.css';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import { renderLoading } from '../utils/utils.js';
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
  .catch((err) => {
    console.log(`Error: ${err}`);
  })
}

function toggleLike(card) {
  if (!card.isLiked()) {
    api.addLike(card.getCardId())
    .then((cardData) => {
      card.updateLikes(cardData)
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
  } else {
    api.deleteLike(card.getCardId())
    .then((cardData) => {
      card.updateLikes(cardData)
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
  }
}

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
    renderLoading('.popup_type_edit-profile', true);
    api
    .editUserData(data.profile__name, data.profile__job)
    .then(userData => {

      userInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      renderLoading('.popup_type_edit-profile', false);
    });

  }
})

popupEditProfile.setEventListeners();


const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_change-avatar',
  handleFormSubmit: (data) => {
    renderLoading('.popup_type_change-avatar', true);
    api
    .changeAvatar(data.avatar_link)
    .then(userData => {

      userInfo.setUserInfo(userData);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      renderLoading('.popup_type_change-avatar', false);
    });

  }
})

popupEditAvatar.setEventListeners();


const popupAddCard = new PopupWithForm({
  popupSelector:'.popup_type_add-card',
  handleFormSubmit: (data) => {
    renderLoading('.popup_type_add-card', true, "Создать", "Создание...");
    api
    .postNewCard(data.card_name, data.card_link)
    .then(cardData => {
      cardList.addItem(cardData);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      renderLoading('.popup_type_add-card', false);
    })
  }

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
  addCardFormValidator.resetValidation();
  popupAddCard.open();
});

editAvatar.addEventListener('click', () => {
  editAvatarFormValidator.resetValidation();
  popupEditAvatar.open();
});


// page initialization
api.getAppInfo().then(([userData, cardData]) => {
  userInfo.setUserInfo(userData);
  cardList.renderItems(cardData.reverse());
})
.catch((err) => {
  console.log(`Error: ${err}`);
})
