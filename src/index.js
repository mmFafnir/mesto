
import './pages/index.css'; 



import Section from './scripts/Section.js'
import Card from './scripts/Card.js'
import FormValidator from './scripts/FormValidator.js'

import { PopupWithForm, PopupWithImage } from './scripts/Popup.js';

import UserInfo from './scripts/UserInfo.js';



export const user = new UserInfo({
  name: '.profile__title',
  about: '.profile__description'
})


const handleCardClick = (item) => {

  popupImages.open(item);
  popupImages.setEventListeners();  
}


function downloadCards () {
    const initialCards = [
        {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
          name: 'Байкал',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
      ];
    
    
      
        let templateCatds = []  

        initialCards.forEach((item, index) => {
          const card = new Card(item, '#element-template', handleCardClick) 
          templateCatds.push(card.createCard());
        })

        cardsSection = new Section({
            items: templateCatds,
            renderer: (item, container) => {
                container.prepend(item);
            }
        }, '.elements')
        
        cardsSection.renderAll();  
}

const popupImages = new PopupWithImage('#image');
const popupUser = new PopupWithForm('#description', () => {

    const nameInput = document.querySelector('#input-name');
    const jobInput = document.querySelector('#input-business');

    user.setUserInfo(nameInput.value, jobInput.value)

});
const popupAddCard = new PopupWithForm('#cards', function(){
  
  const item = this._getInputValues()
  console.log(item)
  const card = new Card(item, '#element-template', handleCardClick)
  
  cardsSection.addItem(card.createCard())
})
let cardsSection; 
downloadCards();






const selectorsForm = { 
    formSelector: '.form', 
    inputSelector: '.form__input', 
    submitButtonSelector: '.form__submit', 
    inactiveButtonClass: 'form__submit_inactive', 
    inputErrorClass: 'form__input_type_error', 
    errorClass: 'form__input-error_visible' 
}






const btnPopupUser = document.querySelector('.profile__edit-button');
const btnPopupCard = document.querySelector('.profile__add-button')

btnPopupUser.addEventListener('click', () => {
    popupUser.open();
    popupUser.setEventListeners();

    const nameInput = document.querySelector('#input-name');
    const jobInput = document.querySelector('#input-business');

    const userInf = user.getUserInfo() 
    nameInput.value = userInf.name.trim();
    jobInput.value = userInf.about.trim();
})

btnPopupCard.addEventListener('click', () => {
  popupAddCard.open();
  popupAddCard.setEventListeners();
})



const form1 = new FormValidator(selectorsForm, '.form-one');
form1.enableValidation()
const form2 = new FormValidator(selectorsForm, '.form-two');
form2.enableValidation()



