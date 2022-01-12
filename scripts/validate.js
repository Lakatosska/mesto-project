// Вынесем все необходимые элементы формы в константы
// Находим форму в DOM
const editFormElement = document.querySelector('.edit-form_profile')

// Находим поля формы в DOM
const editFormInput = editFormElement.querySelector('.edit-form__input')
const nameInput = editFormElement.querySelector('.edit-form__input_name')
const jobInput = editFormElement.querySelector('.edit-form__input_job')

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

formElement.addEventListener('submit', function (evt) {
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
