const showInputError = (formElement, inputElement, errorMessage,rest) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(rest.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(rest.errorClass);
}

const hideInputError =  (formElement, inputElement,rest)  => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(rest.inputErrorClass);
    errorElement.classList.remove(rest.errorClass);
    errorElement.textContent = '';
}

const isValid = (formElement,inputElement,rest) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement,inputElement,inputElement.validationMessage,rest);
    } else {
        hideInputError(formElement,inputElement,rest);
    }
}

// Дизэйбл кнопки сабмита

const disableSubmitButton = (buttonElement,rest) => {
    buttonElement.classList.add(rest.inactiveButtonClass);
    buttonElement.setAttribute('disabled',true)
}

// Вешаем обработчики событий на все поля
const setEventListeners = (formElement,rest) => {
    const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
    const buttonElement = formElement.querySelector(rest.submitButtonSelector);
    toggleButtonState(inputList,buttonElement,rest);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input',() => {
            isValid(formElement,inputElement,rest);
            toggleButtonState(inputList,buttonElement,rest);
        })
    })
}

//Проверяем на валидность инпуты, если хоть один элемент не валдиный вернет true, если все валдины вернет false
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) =>{
        return !inputElement.validity.valid
    });
}

//Меняем состояние кнопки 
const toggleButtonState = (inputList, buttonElement,rest) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement,rest);
    } else {
        buttonElement.classList.remove(rest.inactiveButtonClass);
        buttonElement.removeAttribute('disabled')
    }
}

const enableValidation = ({...rest}) => {
    const formList = Array.from(document.querySelectorAll(rest.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            const buttonElement = formElement.querySelector(rest.submitButtonSelector);
            evt.preventDefault();
            disableSubmitButton(buttonElement,rest);
        });
        setEventListeners(formElement,rest);
    })
};

enableValidation({ 
    formSelector: '.form', 
    inputSelector: '.form__input', 
    submitButtonSelector: '.form__submit', 
    inactiveButtonClass: 'form__submit_inactive', 
    inputErrorClass: 'form__input_type_error', 
    errorClass: 'form__input-error_visible' 
});

