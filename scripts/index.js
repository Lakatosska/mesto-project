<!-- Профиль. Открытие и закрытие модального окна, редактирование -->

const profile = document.querySelector('.profile')
const popupEdit = document.querySelector('.popup_profile-edit')
const editButton =  profile.querySelector('.profile__edit-button')
const closeEditButton =  popupEdit.querySelector('.popup__close-button')

const openPopupEdit = () => popupEdit.classList.add('popup_opened')
const closePopupEdit = () => popupEdit.classList.remove('popup_opened')


// Находим форму в DOM
const editFormElement = document.querySelector('.edit-form_profile')

// Находим поля формы в DOM
const nameInput = editFormElement.querySelector('.edit-form__input_name')
const jobInput = editFormElement.querySelector('.edit-form__input_job')

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = profile.querySelector('.profile__name')
const profileJob = profile.querySelector('.profile__job')

// Открытие модального окна, поля заполняются значениями, указанными в профиле
editButton.addEventListener('click', () => {
  openPopupEdit()
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

// Закрытие модального окна, введенные данные не сохраняются
closeEditButton.addEventListener('click', () => closePopupEdit())

// Обработчик «отправки» формы, введенные данные сохраняются, модальное окно закрывается
function formSubmitHandler (evt) {
  evt.preventDefault()

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopupEdit()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', formSubmitHandler)


<!-- Карточки + кнопка добавления и закрытия, модальное окно на добавление и на просмотр -->

// модальное окно с просмотром картинки
const popupImage = document.querySelector('.popup_image')
const popupPhoto = popupImage.querySelector('.popup__photo')
const popupTitle = popupImage.querySelector('.popup__sightseeing')
const closeImageButton = popupImage.querySelector('.popup__close-button')
const openPopupImage = () => popupImage.classList.add('popup_opened')
const closePopupImage = () => popupImage.classList.remove('popup_opened')
closeImageButton.addEventListener('click', () => closePopupImage())


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
    popupTitle.textContent = name
    openPopupImage()
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

const popupAdd = document.querySelector('.popup_add-card')
const addButton = profile.querySelector('.profile__add-button')
const closeAddButton = popupAdd.querySelector('.popup__close-button')
const openPopupAdd = () => popupAdd.classList.add('popup_opened')
const closePopupAdd = () => popupAdd.classList.remove('popup_opened')
addButton.addEventListener('click', () => openPopupAdd())
closeAddButton.addEventListener('click', () => closePopupAdd())

const addFormElement = document.querySelector('.edit-form_card')
const cardNameInput = addFormElement.querySelector('.edit-form__input_card-name')
const cardLinkInput = addFormElement.querySelector('.edit-form__input_card-link')

// Обработчик «отправки» формы, введенные данные прогоняются через функцию "создания" и "добавления", модальное окно закрывается, поля очищаются
function addFormSubmitHandler(evt) {
  evt.preventDefault()

  cardsList.prepend(addCard(cardNameInput.value, cardLinkInput.value))
  closePopupAdd()
  addFormElement.reset()
}

// Прикрепляем обработчик к форме
addFormElement.addEventListener('submit', addFormSubmitHandler)




