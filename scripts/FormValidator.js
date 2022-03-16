





export default class FormValidator {
     
    constructor(inputLists, form) {
        this.inputLists = inputLists;
        this.form = document.querySelector(`${form}`);
        this.buttonElement = this.form.querySelector(this.inputLists.submitButtonSelector);
    }   
    
    enableValidation(){
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.#disableSubmitButton();
        });
        this.#setEventListeners();
    }
    // Дизэйбл кнопки сабмита
    #disableSubmitButton(){
        this.buttonElement.classList.add(this.inputLists.inactiveButtonClass);
        this.buttonElement.setAttribute('disabled',true)
    }

    // Вешаем обработчики событий на все поля
    #setEventListeners(){
        this.inputList = Array.from(this.form.querySelectorAll(this.inputLists.inputSelector));
        this.#toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input',() => {
                this.#isValid(inputElement);
                this.#toggleButtonState();
            })
        })
    }

    //Проверяем на валидность инпуты, если хоть один элемент не валдиный вернет true, если все валдины вернет false
    #hasInvalidInput() {
        return this.inputList.some((inputElement) =>{
            return !inputElement.validity.valid
        });
    }

    //Меняем состояние кнопки 
    #toggleButtonState(){
        if (this.#hasInvalidInput()) {
            this.#disableSubmitButton();
        } else {
            this.buttonElement.classList.remove(this.inputLists.inactiveButtonClass);
            this.buttonElement.removeAttribute('disabled')
        }
    }
    

    #isValid(inputElement){
        if(!inputElement.validity.valid) {
            this.#showInputError(inputElement,inputElement.validationMessage);
        } else {
            this.#hideInputError(inputElement);
        }
    }
    
    #showInputError(inputElement, errorMessage){
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this.inputLists.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.inputLists.errorClass);
    }

    #hideInputError(inputElement){
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this.inputLists.inputErrorClass);
        errorElement.classList.remove(this.inputLists.errorClass);
        errorElement.textContent = '';
    }

}

