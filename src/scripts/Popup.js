

export default class Popup {
    
    constructor(selector) {
        this.popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this)
        // this.buttonIconClose = this.popup.querySelector('.popup__close')
    }
    open() {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
        // this._handleEscClose();
    }
    close() {
        this.popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
    }
    _handleEscClose(e) {
        // document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        // }) 
    }

    setEventListeners(){
        this.popup.addEventListener('click', (e) => {
            const target = e.target;
            if(target.classList.contains('popup_opened') || target.classList.contains('popup__close')){
                this.close()
            }
        })
    }
}


