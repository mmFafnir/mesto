// Form decription

let formElement = document.getElementById('description-form'),
    nameInput = document.getElementById('input-name'),
    jobInput = document.getElementById('input-business');
    valueInfo = document.querySelector('.profile__title'),
    valueBusiness = document.querySelector('.profile__description');

function formSubmitHandler (evt) { 
    evt.preventDefault();
    closePopup();
    valueInfo.textContent = nameInput.value;
    valueBusiness.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler);


// Popup open and close form description

let popupOpen = document.querySelector('.profile__edit-button'),
    popupClose = document.getElementById('description-close'),
    popup = document.getElementById('description');

function openPopup(){
    popup.classList.add('popup_opened');
    nameInput.value = valueInfo.textContent.trim();
    jobInput.value = valueBusiness.textContent.trim();
}    

function closePopup(){
    popup.classList.remove('popup_opened');
} 

popupOpen.addEventListener('click', openPopup);

popupClose.addEventListener('click',closePopup);


//Form cards

let formElementCards = document.getElementById('cards-form'),
    popupCards = document.getElementById('cards'),
    inputCard = document.getElementById('input-card'),
    inputImage = document.getElementById('input-image'),
    popupCardsOpen = document.querySelector('.profile__add-button'),
    popupCardsClose = document.getElementById('cards-close'),
    elements = document.querySelector('.elements');

function formSubmitHandlerCards (evt) {
    evt.preventDefault();
    cardsClose();

    let item = [];
    item.name = inputCard.value;
    item.link = inputImage.value;

    addCard(createCard(item));

    inputCard.value = '';
    inputImage.value = '';
}

function cardsClose () {
    popupCards.classList.remove('popup_opened')
}

function cardsOpen () {
    popupCards.classList.add('popup_opened')
}

formElementCards.addEventListener('submit',formSubmitHandlerCards);

popupCardsOpen.addEventListener('click',cardsOpen);

popupCardsClose.addEventListener('click',cardsClose);


// Download cards and Delte

let imageBody = document.querySelector('.image__body');
let imageTitle = document.querySelector('.image__title');
let imagePopup = document.getElementById('image');
let imagePopupClose = document.getElementById('image-close');

imagePopupClose.addEventListener('click',function(){
    imagePopup.classList.remove('popup_opened');
})

function handleOpenImage (item) {
    imageBody.src = item.target.src;
    imageTitle.textContent = item.target.alt;
    imagePopup.classList.add('popup_opened')
}

function initialCards () {
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
    initialCards.forEach(function(item){
        addCard(createCard(item));
    })
}


function addCard (card) {
    elements.prepend(card);
}

function deleteCard (evt) {
    evt.target.closest('.element').remove()
}


function createCard (item) {
    let cardTemplate = document.querySelector('#element-template').content;
    let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    let cardImage = cardElement.querySelector('.element__image');
    let cardTitle = cardElement.querySelector('.element__title');
    let cardLikeButton = cardElement.querySelector('.element__like');
    let cardDeleteButton = cardElement.querySelector('.element__trash');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    cardLikeButton.addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_active');
    });

    cardDeleteButton.addEventListener('click',deleteCard);
    cardImage.addEventListener('click',handleOpenImage);

    return cardElement;
}

initialCards();


