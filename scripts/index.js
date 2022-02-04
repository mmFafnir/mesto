// Form

let formElement = document.querySelector('.form'),
    nameInput = document.getElementsByClassName('form__input')[0],
    jobInput = document.getElementsByClassName('form__input')[1],
    valueInfo = document.querySelector('.profile__title'),
    valueBusiness = document.querySelector('.profile__description');

function formSubmitHandler (evt) { 
    evt.preventDefault();
    closePopup();
    valueInfo.textContent = nameInput.value;
    valueBusiness.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler);


// Popup open and close

let popupOpen = document.querySelector('.profile__edit-button'),
    popupClose = document.querySelector('.popup__close'),
    popup = document.querySelector('.popup');

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


