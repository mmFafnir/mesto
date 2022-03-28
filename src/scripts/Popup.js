

export class Popup {
    
    constructor(selector) {
        this.popup = document.querySelector(selector);
        // this.buttonIconClose = this.popup.querySelector('.popup__close')
    }
    open() {
        this.popup.classList.add('popup_opened');
        this._handleEscClose();
    }
    close() {
        this.popup.classList.remove('popup_opened')
    }
    _handleEscClose() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        }) 
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


export class PopupWithImage extends Popup {
    
    open(item) {
        this.image = this.popup.querySelector('.image__body');
        this.title = this.popup.querySelector('.image__title');
        
        this.image.src = item.src;
        this.image.alt = item.alt;
        this.title.textContent = item.alt;

        this.popup.classList.add('popup_opened');

        this._handleEscClose();
    }   
}

export class PopupWithForm extends Popup {
    
    constructor(selector, callback) {
        super();
        this.popup = document.querySelector(selector);
        this.callback = callback
        this.inputs = this.popup.querySelectorAll('input')
        // this.buttonIconClose = this.popup.querySelector('.popup__close')
    }   

    close() {
        this.popup.classList.remove('popup_opened');
        this.inputs.forEach(input => input.value = '');

    }

    _getInputValues() { 
        const InputValues = {};

        this.inputs.forEach(input => {
            InputValues[input.name] = input.value
        });
        return InputValues;
    }

    setEventListeners() {       
        this.popup.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            if(target.classList.contains('popup_opened') || target.classList.contains('popup__close')){
                console.log(target)
                this.close()
            }

            if(target.classList.contains('form__submit')){
                this.callback();
                this.close();
            }
        })

    }
}