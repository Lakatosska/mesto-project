// ПРОФИЛЬ. ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА, РЕДАКТИРОВАНИЕ

const popup = document.querySelector('.popup')
const profile = document.querySelector('.profile')
const popupEdit = document.querySelector('.popup_profile-edit')
const editButton =  profile.querySelector('.profile__edit-button')
const closeEditButton =  popupEdit.querySelector('.popup__close-button')

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

// Закрытие модального окна нажатием на ESC ! пока не работает
document.addEventListener('keydown', function (evt) {
  const openPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(openPopup)
  }
})

/*
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(popup)
  }
}

popup.addEventListener('keydown', keyHandler)

*/


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
const popupImage = document.querySelector('.popup_image')
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

const popupAdd = document.querySelector('.popup_add-card')
const addButton = profile.querySelector('.profile__add-button')
const closeAddButton = popupAdd.querySelector('.popup__close-button')
addButton.addEventListener('click', () => openPopup(popupAdd))
closeAddButton.addEventListener('click', () => closePopup(popupAdd))

const addFormElement = document.querySelector('.edit-form_card')
const cardNameInput = addFormElement.querySelector('.edit-form__input_card-name')
const cardLinkInput = addFormElement.querySelector('.edit-form__input_card-link')

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
// Вынесем все необходимые элементы формы в константы
// Находим форму в DOM
/* const editFormElement = document.querySelector('.edit-form_profile') */

// Находим поля формы в DOM
const editFormInput = editFormElement.querySelector('.edit-form__input')
/* const nameInput = editFormElement.querySelector('.edit-form__input_name')
const jobInput = editFormElement.querySelector('.edit-form__input_job') */

editFormElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение
  evt.preventDefault();
});

// Слушатель события input
editFormInput.addEventListener('input', function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода,
  // на котором слушаем событие input
  console.log(evt.target.validity.valid);
});

const editFormError = editFormElement.querySelector(`.${editFormInput.id}-error`);

// Функция, которая добавляет класс с ошибкой
// Передадим текст ошибки вторым параметром
const showInputError = (editFormElement, editFormInput, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const editFormError = editFormElement.querySelector(`.${editFormInput.id}-error`);

  editFormInput.classList.add('edit-form__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  editFormError.textContent = errorMessage;
  // Показываем сообщение об ошибке
  editFormError.classList.add('edit-form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (editFormElement, editFormInput) => {
  // Находим элемент ошибки
  const editFormError = editFormElement.querySelector(`.${editFormInput.id}-error`);

  editFormInput.classList.remove('edit-form__input_type_error');
  // Скрываем сообщение об ошибке
  editFormError.remove('edit-form__input-error_active');
  // Очистим ошибку
  editFormError.textContent = '';
};

// Функция, которая проверяет валидность поля
// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
const isValid = (editFormElement, editFormInput) => {
  if (!editFormInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    // Передадим сообщение об ошибке вторым аргументом
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(editFormElement, editFormInput, editFormInput.validationMessage);
  } else {
    // Если проходит, скроем
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(editFormElement, editFormInput);
  }
};

editFormElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

//добавим слушатель событий всем полям ввода внутри формы
const setEventListeners = (editFormElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(editFormElement.querySelectorAll('.edit-form__input'));

  // Найдём в текущей форме кнопку отправки
  const buttonSubmitElement = formElement.querySelector('.popup__submit-button');

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    // нужно для того, чтобы кнопка сразу была неактивной
    toggleButtonState(inputList, buttonSubmitElement);


  // Обойдём все элементы полученной коллекции
  inputList.forEach((editFormInput) => {
    // каждому полю добавим обработчик события input
    editFormInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(editFormElement, editFormInput);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonSubmitElement);
    });
  });
};

//найдем все формы в DOM и вызовем для всех setEventListeners
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.edit-form'));

  // Переберём полученную коллекцию
  formList.forEach((editFormElement) => {
    editFormElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(editFormElement);
  });
};

// Вызовем функцию
enableValidation();

// Функция проверяет наличие невалидного поля (чтобы потом настроить статус кнопки)
// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((editFormInput) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !editFormInput.validity.valid;
  })
};

// Функция для вкл-выкл кнопки принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonSubmitElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonSubmitElement.classList.add('form__submit_inactive');
  } else {
        // иначе сделай кнопку активной
    buttonSubmitElement.classList.remove('form__submit_inactive');
  }
};

