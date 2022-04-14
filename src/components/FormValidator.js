





export default class FormValidator {
     
    constructor(inputLists, form) {
        this.inputLists = inputLists;
        this.form = document.querySelector(`${form}`);
        this.buttonElement = this.form.querySelector(this.inputLists.submitButtonSelector);
    }   
    
    enableValidation(){
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
    // Дизэйбл кнопки сабмита
    _disableSubmitButton(){
        this.buttonElement.classList.add(this.inputLists.inactiveButtonClass);
        this.buttonElement.setAttribute('disabled',true)
    }

    // Вешаем обработчики событий на все поля
    _setEventListeners(){
        this.inputList = Array.from(this.form.querySelectorAll(this.inputLists.inputSelector));
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input',() => {
                this._isValid(inputElement);
                this._toggleButtonState();
            })
        })
    }

    //Проверяем на валидность инпуты, если хоть один элемент не валдиный вернет true, если все валдины вернет false
    _hasInvalidInput() {
        return this.inputList.some((inputElement) =>{
            return !inputElement.validity.valid
        });
    }

    //Меняем состояние кнопки 
    _toggleButtonState(){
        if (this._hasInvalidInput()) {
            this._disableSubmitButton();
        } else {
            this.buttonElement.classList.remove(this.inputLists.inactiveButtonClass);
            this.buttonElement.removeAttribute('disabled')
        }
    }
    

    _isValid(inputElement){
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement,inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _showInputError(inputElement, errorMessage){
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this.inputLists.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.inputLists.errorClass);
    }

    _hideInputError(inputElement){
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this.inputLists.inputErrorClass);
        errorElement.classList.remove(this.inputLists.errorClass);
        errorElement.textContent = '';
    }

}

