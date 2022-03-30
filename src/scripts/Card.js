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
        this.cardImage = this.cardElement.querySelector('.element__image');
        this.cardTitle = this.cardElement.querySelector('.element__title');
        this.cardLikeButton = this.cardElement.querySelector('.element__like');
        this.cardDeleteButton = this.cardElement.querySelector('.element__trash');
        
        this.cardImage.src = this.url;
        this.cardImage.alt = this.name;
        this.cardTitle.textContent = this.name;

        this._setEventListeners();

        return this.cardElement;
    }

    _setEventListeners() {
        this.cardLikeButton.addEventListener('click', (evt) => this._likeCard(evt));

        this.cardDeleteButton.addEventListener('click', () => this._deleteCard());
        this.cardImage.addEventListener('click', () => this.popalImgOpen({
            src: this.url,
            alt: this.name,
        }));
    }

    _likeCard(evt) {
        evt.target.classList.toggle('element__like_active');
    }
    _deleteCard() {
        this.cardElement.remove()
    }
}
