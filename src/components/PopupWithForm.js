
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {

    constructor(selector, callback) {

        super(selector);

        this.callback = callback;
        this.inputs = this.popup.querySelectorAll('input');
        this.form = this.popup.querySelector('form');
        this.btnSubmit = this.popup.querySelector('.form__submit');
        // this.buttonIconClose = this.popup.querySelector('.popup__close')
    }   

     open(callback) {
        callback();
        super.open();

     }
     close() {

        super.close();
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
        super.setEventListeners();
        this.form.addEventListener('submit', async (e) => {

            this.btnSubmit.textContent = 'Сохранить...';
            this.btnSubmit.setAttribute('disabled',true);

            this.callback()
;

        })
    }
}   
