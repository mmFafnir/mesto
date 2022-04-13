

    import './index.css';

    import Api from '../components/Api.js';
    import Section from '../components/Section.js';
    import Card from '../components/Card.js';
    import FormValidator from '../components/FormValidator.js';

    import PopupWithImage from '../components/PopupWithImage.js';
    import PopupWithForm from '../components/PopupWithForm.js';
    import PopupNotify from '../components/PopupNotify.js';

    import UserInfo from '../components/UserInfo.js';

    import { initialCards, selectorsForm } from '../utils/constants'

    const user = new UserInfo({

      name: '.profile__title',
      about: '.profile__description',
      avatar: '.profile__avatar'
    })

    const cardsApi = new Api({
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
    async function fetchUser  () {
        const userObj = await userApi.getInitial();
        const userData = await userObj.data
        if(userObj.status){
            user.id = await userData._id;
            await user.setUserInfo(
                userData.name,
                userData.about,

            )
            await user.setUserAvatar(userData.avatar)

        }
    }
    fetchUser()



    const handleCardClick = (item) => {
      popupImages.open(item);
    }

    const createCard = (item) => {
      const card = new Card(item, '#element-template', handleCardClick, popupCardDelete, user, cardsApi);
      return card.createCard()
    }


    let cardsSection; //Создаю переменную cardsSection, для того чтобы получить к ней доступ во всем документе.

    //console.log(cardsApi.getInitialCards)

    async function downloadCards () {

            let templateCatds = [];
            const cards = await cardsApi.getInitial();
            const cardsData = await cards.data

            if(cards.status){
                await cardsData.forEach((item) => {
                  templateCatds.push(createCard(item));
                })
            }

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
        const values = await popupUser.getInputValues();
        const userPatch = await userApi.PATCH({
           name: values.Title,
           about: values.Business
        });
        if(userPatch.status){
            await user.setUserInfo(values.Title, values.Business);
            return true
        }

    });
    popupUser.setEventListeners();

    const popupAvatar = new PopupWithForm('#popup-avatar', async function(){
        const value = await popupAvatar.getInputValues();
        const avatarPatch = await userApi.PATCH({
            avatar: value.link
        }, 'avatar');
        if(avatarPatch.status) {
            await user.setUserAvatar(value.link);
            return true
        }
    });
    popupAvatar.setEventListeners()

    const popupCardDelete = new PopupNotify('#delete-notify', function() {
        cardsApi.DELETE(popupCardDelete.id)
    });
    popupCardDelete.setEventListeners();


    const popupAddCard = new PopupWithForm('#cards', async function (){
      const {name, link} = await popupAddCard.getInputValues();
      const item = await cardsApi.POST({
        name, link
      });
      if(item.status){
        await cardsSection.addItem(createCard(item.data));
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



