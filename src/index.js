
import './pages/index.css'; 

import Section from './scripts/Section.js'
import Card from './scripts/Card.js'
import FormValidator from './scripts/FormValidator.js'

import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';

import UserInfo from './scripts/UserInfo.js';

import { initialCards, selectorsForm } from './utils/constants'


export const user = new UserInfo({
  name: '.profile__title',
  about: '.profile__description'
})


const handleCardClick = (item) => {
  popupImages.open(item);
}

const createCard = (item) => {  
  const card = new Card(item, '#element-template', handleCardClick);
  return card.createCard()
}

  
let cardsSection; //Создаю переменную cardsSection, для того чтобы получить к ней доступ во всем документе.

function downloadCards () {

        let templateCatds = []  

        initialCards.forEach((item) => {
          templateCatds.push(createCard(item));
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
popupImages.setEventListeners();  
const popupUser = new PopupWithForm('#description', () => {
    const values = popupUser.getInputValues() 
    user.setUserInfo(values.Title, values.Business)
});
popupUser.setEventListeners();

const popupAddCard = new PopupWithForm('#cards', function(){
  
  const item = this.getInputValues()
  console.log(item)
  const card = new Card(item, '#element-template', handleCardClick)
  
  cardsSection.addItem(card.createCard())
})
popupAddCard.setEventListeners();
downloadCards();













const btnPopupUser = document.querySelector('.profile__edit-button');
const btnPopupCard = document.querySelector('.profile__add-button')


const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-business');

btnPopupUser.addEventListener('click', () => {
    popupUser.open();

    const userInf = user.getUserInfo() 
    nameInput.value = userInf.name.trim();
    jobInput.value = userInf.about.trim();
})

btnPopupCard.addEventListener('click', () => {
  popupAddCard.open();
  
})



const form1 = new FormValidator(selectorsForm, '.form-one');
form1.enableValidation()
const form2 = new FormValidator(selectorsForm, '.form-two');
form2.enableValidation()



