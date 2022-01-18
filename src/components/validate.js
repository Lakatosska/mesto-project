const showInputError = (inputElement, inputErrorClass, errorElement, errorClass, errorMessage) => {
  inputElement.classList.add(inputErrorClass)
  errorElement.classList.add(errorClass)
  errorElement.textContent = errorMessage
}

const hideInputError = (inputElement, inputErrorClass, errorElement, errorClass) => {
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ""
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  if (inputElement.validity.valid) {
    hideInputError(inputElement, inputErrorClass, errorElement, errorClass)
  } else {
    showInputError(inputElement, inputErrorClass, errorElement, errorClass, inputElement.validationMessage)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector)

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.disabled = false
  }
}

const setEventListeners = (formElement, { inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass)
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
    })
  })

  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
}

const enableValidation = ({ formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector))

  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    setEventListeners(formElement, rest)
  })
}

export { enableValidation }
