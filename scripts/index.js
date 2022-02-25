// Закрываем popup с помощью ESC
const popupList = Array.from(document.querySelectorAll('.popup'));



function closePopup() {
    popupList.forEach((popupElement) => {
        if (popupElement.classList.contains('popup_opened')) {
            popupElement.classList.remove('popup_opened');
        }
    })
    document.removeEventListener('keydown',handleEscKey);
    document.removeEventListener('mousedown', handleOverlayClick);
}


function handleEscKey(evt) {
    console.log(evt);
    if (evt.key === 'Escape') {
        closePopup();
    }
}

function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup();
    }
}

// Popup open and close form description

const popupOpenProfile = document.querySelector('.profile__edit-button'),
    popupProfile = document.querySelector('#description');

function openProfilePopup(){
    nameInput.value = nameInfo.textContent.trim();
    jobInput.value = jobInfo.textContent.trim();
    openPopup(popupProfile);
};    




popupOpenProfile.addEventListener('click', openProfilePopup);


// Form decription

function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown',handleEscKey);
    document.addEventListener('mousedown', handleOverlayClick);
}


const formProfileElement = document.querySelector('#description-form');
const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-business');
const nameInfo = document.querySelector('.profile__title');
const jobInfo = document.querySelector('.profile__description');
const formInputsProfile = [nameInput,jobInput];

function handleProfileFormSubmit (evt) { 
    console.log(formInputsProfile);  
    evt.preventDefault();
    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
       
    closePopup();
};

formProfileElement.addEventListener('submit',handleProfileFormSubmit);


//Form cards

const formCardsElement = document.querySelector('#cards-form');
const popupCards = document.querySelector('#cards');
const inputCard = document.querySelector('#input-card');
const inputImage = document.querySelector('#input-image');
const popupOpenCards = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');

function handleCardsFormSubmit (evt) {
    evt.preventDefault();

    const item = {};
    item.name = inputCard.value;
    item.link = inputImage.value;

    addCard(createCard(item));

    inputCard.value = '';
    inputImage.value = '';
    closePopup();
};



formCardsElement.addEventListener('submit',handleCardsFormSubmit);

popupOpenCards.addEventListener('click',function() {
    openPopup(popupCards);
});


// Download cards and Delte

const imageBody = document.querySelector('.image__body');
const imageTitle = document.querySelector('.image__title');
const imagePopup = document.querySelector('#image');


function openImagePopup (item) {
    imageBody.src = item.target.src;
    imageBody.alt = item.target.alt;
    imageTitle.textContent = item.target.alt;
    openPopup(imagePopup);
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
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    const cardLikeButton = cardElement.querySelector('.element__like');
    const cardDeleteButton = cardElement.querySelector('.element__trash');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    cardLikeButton.addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_active');
    });

    cardDeleteButton.addEventListener('click',deleteCard);
    cardImage.addEventListener('click',openImagePopup);

    return cardElement;
}

downloadCards();


// Закрываем popup на крестик

const closePopupButtonList = Array.from(document.querySelectorAll('.popup__close'));

closePopupButtonList.forEach((buttonElement) => {
    buttonElement.addEventListener('click',closePopup)
})