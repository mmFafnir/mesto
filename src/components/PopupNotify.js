import Popup from './Popup.js'

export default class PopupNotify extends Popup {

    constructor(select, callback) {
        super(select);
        this.callback = callback
        this.btnSubmit = this.popup.querySelector('.form__submit');
    }

    open(id){
        super.open();
        this.id = id;

    }

    setEventListeners() {
        super.setEventListeners();
            this.btnSubmit.addEventListener('click', (evt) => {
            evt.preventDefault()
            this.callback();
        })
    }
}