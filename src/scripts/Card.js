// import {openImagePopup} from './index.js'
export default class Card {

    constructor(item, selector, popalImgOpen){
        this.name = item.name;
        this.url = item.link;
        this.selector = selector;
        this.popalImgOpen = popalImgOpen
    }
    createCard() {
        const cardTemplate = document.querySelector(`${this.selector}`).content;
        this.cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        const cardImage = this.cardElement.querySelector('.element__image');
        const cardTitle = this.cardElement.querySelector('.element__title');
        const cardLikeButton = this.cardElement.querySelector('.element__like');
        const cardDeleteButton = this.cardElement.querySelector('.element__trash');
        
        cardImage.src = this.url;
        cardImage.alt = this.name;
        cardTitle.textContent = this.name;
        
        cardLikeButton.addEventListener('click', (evt) => this._likeCard(evt));
    
        cardDeleteButton.addEventListener('click', () => this._deleteCard());
        cardImage.addEventListener('click', () => this.popalImgOpen({
            src: this.url,
            alt: this.name, 
        }));
    
        return this.cardElement;
    }
    _likeCard(evt) {
        evt.target.classList.toggle('element__like_active');
    }
    _deleteCard() {
        this.cardElement.remove()
    }
}
