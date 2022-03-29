import Popup from './Popup.js'


export default class PopupWithForm extends Popup {
    
    constructor(selector, callback) {
        super(selector);
        // this.popup = super.popup    
        // this.popup = document.querySelector(selector);
        this.callback = callback
        this.inputs = this.popup.querySelectorAll('input')
        this.form = this.popup.querySelector('form')
        // this.buttonIconClose = this.popup.querySelector('.popup__close')
    }   

    close() {
        this.popup.classList.remove('popup_opened');
        setTimeout(() => {
            this.inputs.forEach(input => input.value = '');
        }, 0);

    }

    getInputValues() { 
        const inputValues = {};

        this.inputs.forEach(input => {
            inputValues[input.name] = input.value
        });
        return inputValues;
    }

    setEventListeners() {       
        this.popup.addEventListener('click', (e) => {
            const target = e.target;
            if(target.classList.contains('popup_opened') || target.classList.contains('popup__close')){
                this.close()
            }

        }) 
        console.log(this.form)
        this.form.addEventListener('submit', (e) => {
            this.callback();
            this.close();
            

        }) 

    }
}   