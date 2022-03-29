
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    
    constructor(selector){
        // this.popup = document.querySelector(selector);
        // this._handleEscClose = this._handleEscClose.bind(this)
        super(selector);
        this.image = this.popup.querySelector('.image__body');
        this.title = this.popup.querySelector('.image__title');
    }

    open(item) {
    // super()        
    
        this.image.src = item.src;
        this.image.alt = item.alt;
        this.title.textContent = item.alt;

        super.open( );
        // console.log(super())
        // this.popup.classList.add('popup_opened');

        // document.addEventListener('keydown', this._handleEscClose)
        // this._handleEscClose();
    }   
}
