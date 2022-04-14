

    import './index.css';

    import Api from '../components/Api.js';
    import Section from '../components/Section.js';
    import Card from '../components/Card.js';
    import FormValidator from '../components/FormValidator.js';

    import PopupWithImage from '../components/PopupWithImage.js';
    import PopupWithForm from '../components/PopupWithForm.js';
    import PopupNotify from '../components/PopupNotify.js';

    import UserInfo from '../components/UserInfo.js';

    import { selectorsForm } from '../utils/constants';

    const user = new UserInfo({
      name: '.profile__title',
      about: '.profile__description',
      avatar: '.profile__avatar'
    })

    const api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
        headers: {
            authorization: '446e7ea3-0df9-437f-a6c2-d22adf8a9199',
            'Content-Type': 'application/json'
        }
    })

     function initialUser  (userData) {
        user.setUserInfo(
            userData.name,
            userData.about,
            userData.avatar,
            userData._id,
        )
        user.setUserAvatar(userData.avatar)
    }




    const handleCardClick = (item) => {
      popupImages.open(item);
    }

    const createCard = (item) => {
      const card = new Card(item, '#element-template', handleCardClick, popupCardDelete, user, api);
      return card.createCard()
    }


    let cardsSection; //Создаю переменную cardsSection, для того чтобы получить к ней доступ во всем документе.
    function initialCards (cards) {
            const templateCatds = [];
            cards.forEach((item) => {
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


    Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cards]) => {
            initialUser(userData);
            initialCards(cards)
        })



    const popupImages = new PopupWithImage('#image');
    popupImages.setEventListeners();

    const popupUser = new PopupWithForm('#description', function () {
        const values = popupUser.getInputValues();
         api.updateUserInfo({
           name: values.Title,
           about: values.Business
        })
        .then((userData) => {
            user.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);
            popupUser.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            popupUser.btnSubmit.disabled = false;
            popupUser.btnSubmit.textContent = 'Сохранить'
        })

    });
    popupUser.setEventListeners();

    const popupAvatar = new PopupWithForm('#popup-avatar',function(){
        const value = popupAvatar.getInputValues();
        api.updateAvatar({
            avatar: value.link
        }).then((userData) => {
            user.setUserAvatar(userData.avatar);
            popupAvatar.close();
        })
        .catch((err) => {
            console.log(err)
            return false
        })
        .finally(() => {
            popupAvatar.btnSubmit.disabled = false;
            popupAvatar.btnSubmit.textContent = 'Сохранить'
        })
    });
    popupAvatar.setEventListeners()

    const popupCardDelete = new PopupNotify('#delete-notify', function() {
        api.deleteCard(popupCardDelete.id)
        .then(() => {
            document.getElementById(popupCardDelete.id).remove()
            popupCardDelete.close();
        })
        .catch((e) => console.log(e))
    });
    popupCardDelete.setEventListeners();


    const popupAddCard = new PopupWithForm('#cards', function (){
      const {name, link} = popupAddCard.getInputValues();
      api.addCard({name, link})
      .then((item) => {
        cardsSection.addItem(createCard(item));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.btnSubmit.disabled = false;
        popupAddCard.btnSubmit.textContent = 'Сохранить';
      })
    })
    popupAddCard.setEventListeners();


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



    const validatorProfile = new FormValidator(selectorsForm, '.form-one');
    validatorProfile.enableValidation()
    const validatorCards = new FormValidator(selectorsForm, '.form-two');
    validatorCards.enableValidation()
    const validatorAvatar = new FormValidator(selectorsForm, '#popup-avatar');
    validatorAvatar.enableValidation()


