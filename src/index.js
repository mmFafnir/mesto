

import './pages/index.css';

import Api from './scripts/Api.js';
import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';

import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupNotify from './scripts/PopupNotify.js';

import UserInfo from './scripts/UserInfo.js';

import { initialCards, selectorsForm } from './utils/constants'

export const user = new UserInfo({

  name: '.profile__title',
  about: '.profile__description',
  avatar: '.profile__avatar'
})

export const cardsApi = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/cards',
    headers: {
        authorization: '446e7ea3-0df9-437f-a6c2-d22adf8a9199',
        'Content-Type': 'application/json'
    }
})

const userApi = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-39/users/me',
    headers: {
        authorization: '446e7ea3-0df9-437f-a6c2-d22adf8a9199',
        'Content-Type': 'application/json'
    }
})

const avatarApi = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-39/users/me/avatar',
    headers: {
        authorization: '446e7ea3-0df9-437f-a6c2-d22adf8a9199',
        'Content-Type': 'application/json'
    }
})

async function fetchUser  () {
    const userObj = await userApi.getInitial();
    await console.log(userObj)
    user.id = await userObj._id;
    await user.setUserInfo(
        userObj.name,
        userObj.about,

    )
    await user.setUserAvatar(userObj.avatar)
}
fetchUser()



const handleCardClick = (item) => {
  popupImages.open(item);
}

const createCard = (item) => {
  const card = new Card(item, '#element-template', handleCardClick);
  return card.createCard()
}


let cardsSection; //Создаю переменную cardsSection, для того чтобы получить к ней доступ во всем документе.

//console.log(cardsApi.getInitialCards)

async function downloadCards () {

        let templateCatds = [];

        const cards = await cardsApi.getInitial();
        await cards.forEach((item) => {
          templateCatds.push(createCard(item));
        })

        cardsSection = await new Section({
            items: templateCatds,
            renderer: (item, container) => {
                container.prepend(item);
            }
        }, '.elements')

        await cardsSection.renderAll();
}

const popupImages = new PopupWithImage('#image');
popupImages.setEventListeners();
const popupUser = new PopupWithForm('#description', async function () {
    const values = await this.getInputValues();
    const statusPatch = await userApi.PATCH({
       name: values.Title,
       about: values.Business
    });
    if(statusPatch){
        await user.setUserInfo(values.Title, values.Business);
        return statusPatch
    }

});
popupUser.setEventListeners();

const popupAvatar = new PopupWithForm('#popup-avatar', async function(){
    const value = await this.getInputValues();
    const statusPatch = await avatarApi.PATCH({
        avatar: value.link
    });
    if(statusPatch) {
        await user.setUserAvatar(value.link);
        return statusPatch
    }
});
popupAvatar.setEventListeners()

export const popupCardDelete = new PopupNotify('#delete-notify', function() {
    cardsApi.DELETE(this.id)
});
popupCardDelete.setEventListeners();


const popupAddCard = new PopupWithForm('#cards', async function (){
  const {name, link} = await this.getInputValues();
  const item = await cardsApi.POST({
    name, link
  });
  if(item){
    await cardsSection.addItem(createCard(item));
    return true
  }
  return false

})
popupAddCard.setEventListeners();
downloadCards();


const btnPopupUser = document.querySelector('.profile__edit-button');
const btnPopupCard = document.querySelector('.profile__add-button');
const btnPopupAvatar = document.querySelector('.profile__avatar');

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

btnPopupAvatar.addEventListener('click', () => {
    popupAvatar.open()
})



const form1 = new FormValidator(selectorsForm, '.form-one');
form1.enableValidation()
const form2 = new FormValidator(selectorsForm, '.form-two');
form2.enableValidation()



