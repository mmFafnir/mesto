// Popup open and close form description

const popupOpenProfile = document.querySelector('.profile__edit-button'),
    popupCloseProfile = document.querySelector('#description-close'),
    popupProfile = document.querySelector('#description');

function createPopup(){
    nameInput.value = nameInfo.textContent.trim();
    jobInput.value = jobInfo.textContent.trim();
    openPopup(popupProfile);
};    




popupOpenProfile.addEventListener('click', createPopup);

popupCloseProfile.addEventListener('click',function() {
    closePopup(popupProfile);
});

// Form decription

function openPopup(element) {
    element.classList.add('popup_opened');
}

function closePopup(evt) {
    evt.classList.remove('popup_opened');
}

const formProfileElement = document.querySelector('#description-form'),
    nameInput = document.querySelector('#input-name'),
    jobInput = document.querySelector('#input-business');
    nameInfo = document.querySelector('.profile__title'),
    jobInfo = document.querySelector('.profile__description');
    formInputsProfile = [nameInput,jobInput];

function formSubmitProfileHandler (evt) { 
    console.log(formInputsProfile);  
    evt.preventDefault();
    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
       
    closePopup(popupProfile);
};

formProfileElement.addEventListener('submit',formSubmitProfileHandler);


//Form cards

const formElementCards = document.querySelector('#cards-form'),
    popupCards = document.querySelector('#cards'),
    inputCard = document.querySelector('#input-card'),
    inputImage = document.querySelector('#input-image'),
    popupOpenCards = document.querySelector('.profile__add-button'),
    popupCloseCards = document.querySelector('#cards-close'),
    elements = document.querySelector('.elements');

function cardsformSubmitHandler (evt) {
    evt.preventDefault();

    const item = [];
    item.name = inputCard.value;
    item.link = inputImage.value;

    addCard(createCard(item));

    inputCard.value = '';
    inputImage.value = '';
    closePopup(popupCards);
};



formElementCards.addEventListener('submit',cardsformSubmitHandler);

popupOpenCards.addEventListener('click',function() {
    openPopup(popupCards);
});

popupCloseCards.addEventListener('click',function() {
    closePopup(popupCards);
});


// Download cards and Delte

const imageBody = document.querySelector('.image__body');
const imageTitle = document.querySelector('.image__title');
const imagePopup = document.querySelector('#image');
const imagePopupClose = document.querySelector('#image-close');

imagePopupClose.addEventListener('click',function(){
    closePopup(imagePopup);
})

function handleOpenImage (item) {
    imageBody.src = item.target.src;
    imageBody.alt = item.target.alt;
    imageTitle.textContent = item.target.alt;
    openPopup(imagePopup);
    open(imagePopup); // Добавил закрытие popup на overlayа
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
    cardImage.addEventListener('click',handleOpenImage);

    return cardElement;
}

downloadCards();


// Закрываем popup с помощью ESC
const popupList = Array.from(document.querySelectorAll('.popup'));

function open(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown',handleEscClose);
    document.addEventListener('mousedown', closePopupMousedown);
}


function close() {
    popupList.forEach((popupElement) => {
        if (popupElement.classList.contains('popup_opened')) {
            popupElement.classList.remove('popup_opened');
        }
    })
    document.removeEventListener('keydown',handleEscClose.bind);
    document.removeEventListener('mousedown', closePopupMousedown);
}


function handleEscClose(evt) {
    console.log(evt);
    if (evt.keyCode == 27) {
        close();
    }
}

function closePopupMousedown(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        close();
    }
}


popupOpenProfile.addEventListener('click', () => {
    open(popupProfile)
})

popupOpenCards.addEventListener('click',() => {
    open(popupCards);
})

