
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    
    constructor(selector){
        super(selector);

        this.image = this.popup.querySelector('.image__body');
        this.title = this.popup.querySelector('.image__title');
    }

    open(item) {
        this.image.src = item.src;
        this.image.alt = item.alt;
        this.title.textContent = item.alt;

        super.open( );
    }
}
