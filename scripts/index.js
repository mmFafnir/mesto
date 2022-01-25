// Likes

let likes = document.querySelectorAll('.element__like');

for (let index = 0; index<likes.length; index++){
    let like = likes[index];
    like.addEventListener("click", () => 
        like.classList.toggle('active')
    );
}


// Popup open and close

let popupOpen = document.querySelector('.profile__edit-button'),
    popupClose = document.querySelector('.popup__close'),
    popup = document.querySelector('.popup');

popupOpen.addEventListener('click', ()=>{
    popup.classList.add('popup_opened');
})

popupClose.addEventListener('click', ()=>{
    popup.classList.remove('popup_opened');
})


// Form

let formElement = document.querySelector('.form'),
    nameInput = document.querySelector('.form__input_name'),
    jobInput = document.querySelector('.form__input_job'),
    valueInfo = document.querySelector('.profile__title'),
    valueBusiness = document.querySelector('.profile__description');

function formSubmitHandler (evt) { 
    evt.preventDefault();
    popup.classList.remove('popup_opened');
    valueInfo.textContent = nameInput.value;
    valueBusiness.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler);
