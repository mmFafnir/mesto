// Form

let formElement = document.querySelector('.form'),
    nameInput = document.querySelector('.form__input_name'),
    jobInput = document.querySelector('.form__input_job'),
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
    nameInput.value = valueInfo.innerText;
    jobInput.value = valueBusiness.innerText;
}    

function closePopup(){
    popup.classList.remove('popup_opened');
} 

popupOpen.addEventListener('click', openPopup);

popupClose.addEventListener('click',closePopup);


