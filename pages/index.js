<!-- Профиль. Открытие и закрытие модального окна, редактирование -->

const profile = document.querySelector('.profile');

const popupEdit = document.querySelector('.popup_profile-edit')

const popupAdd = document.querySelector('.popup_add-card')

const openPopupEdit = () => {
  popupEdit.classList.add('popup_opened')
}

const openPopupAdd = () => {
  popupAdd.classList.add('popup_opened')
}

const closePopupEdit = () => {
  popupEdit.classList.remove('popup_opened')
}

const closePopupAdd = () => {
  popupAdd.classList.remove('popup_opened')
}

const editButton =  profile.querySelector('.profile__edit-button')

const addButton = profile.querySelector('.profile__add-button')

const closeEditButton =  popupEdit.querySelector('.popup__close-button')

const closeAddButton = popupAdd.querySelector('.popup__close-button')



addButton.addEventListener('click', () => {
  openPopupAdd()
})

closeAddButton.addEventListener('click', () => {
  closePopupAdd()
})


// Находим форму в DOM

const formElement = document.querySelector('.edit-form_profile')
// Воспользуйтесь методом querySelector()

// Находим поля формы в DOM

let nameInput = formElement.querySelector('.edit-form__input_name')
// Воспользуйтесь инструментом .querySelector()

let jobInput = formElement.querySelector('.edit-form__input_job')
// Воспользуйтесь инструментом .querySelector()

let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
// Выберите элементы, куда должны быть вставлены значения полей

editButton.addEventListener('click', () => {
  openPopupEdit();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

closeEditButton.addEventListener('click', () => {
  closePopupEdit()
})

// Обработчик «отправки» формы, хотя пока
function formSubmitHandler (evt) {
  evt.preventDefault();

// Вставьте новые значения с помощью textContent
profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;
closePopupEdit();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

