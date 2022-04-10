import {popupCardDelete, user, cardsApi} from '../index.js'


export default class Card {

    constructor(item, selector, popalImgOpen){
        this.name = item.name;
        this.url = item.link;
        this.id = item._id;
        this.likes = item.likes;
        this.selector = selector;
        this.popalImgOpen = popalImgOpen;
        this.owner = item.owner,
        this.owned = item.owner._id == user.id ? true : false;

    }
    createCard() {
        const cardTemplate = document.querySelector(`${this.selector}`).content;
        this.cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        this.cardElement.id = this.id;
        this.cardImage = this.cardElement.querySelector('.element__image');
        this.cardTitle = this.cardElement.querySelector('.element__title');
        this.cardLikeButton = this.cardElement.querySelector('.element__like');
        this.cardLikeQuantity = this.cardElement.querySelector('.element__like-quantity');
        this.cardDeleteButton = this.cardElement.querySelector('.element__trash');

        this.cardImage.src = this.url;
        this.cardImage.alt = this.name;
        this.cardTitle.textContent = this.name;
        this.cardLikeQuantity.textContent = this.likes.length > 0 ? this.likes.length : '';
        this.likes.find(item => item._id == user.id) ? this.cardLikeButton.classList.add('element__like_active') :
            this.cardLikeButton.classList.remove('element__like_active')


        this._setEventListeners();

        if(!this.owned) {
            this.cardDeleteButton.remove();
        }

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


        if(evt.target.classList.contains('element__like_active')){
            evt.target.classList.remove('element__like_active');

            this.likes = this.likes.filter(item => item._id !== user.id);
            this.cardLikeQuantity.textContent =  this.likes.length > 0 ?  this.likes.length : '';

            cardsApi.DELETE(`${this.id}/likes/`, `${user.id}`);
        }else{
            evt.target.classList.add('element__like_active');

            this.likes.push(user.getUserInfo());
            this.cardLikeQuantity.textContent = this.likes.length;

            cardsApi.PUT(`${this.id}/likes/`, this.likes);
        }

    }
     _deleteCard() {
        popupCardDelete.open(this.id);
    }
}
