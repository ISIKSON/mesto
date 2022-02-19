import "./index.css";
import  Card  from "../components/Card.js";
import Api from "../components/Api.js"
import {FormValidator} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import {initialCards, validationConfig} from "../utils/constants.js";
import {
  buttonEditProfile,
  buttonAddNewCard,
  nameInput,
  jobInput,
  photoNameInput,
  imgLinkInput,
  nameProfile,
  jobProfile,
  avatarProfile,
  cardContainer,
  bigImgName,
  bigImg,
  popupFormEdit,
  popupFormAdd} from "../utils/constants.js";
  //---------------------------------------------------------------------------------
  const api = new Api({
    adress: "https://mesto.nomoreparties.co/v1/cohort-35",
    token:"313e739c-6204-439f-809f-922ebe632716"
  })
  //---------------------------------------------------------------------------------

    const cardsList = new Section (
      // items: item, 
      (item)=>{
        const ticket =  createCard(item);
        const cardElement =  ticket.getElement();
        cardsList.addItem(cardElement);
    },
    cardContainer
    );

const userInfo = new UserInfo({
  nameElement:nameProfile, 
  jobElement:jobProfile, 
  avatarElement:avatarProfile
});


Promise.all([api.getUser(),api.getCards()])
.then(([userData,cards])=> {
  userInfo.setUserInfo(userData);
  cardsList.renderItems(cards);
})
.catch(err => console.log(err))

 //---------------------------------------------------------------------------------
 const popupEditAvatar = new PopupWithForm(".popup_type_avatar-edit", {
  submitHandler:(avatar)=> {

    popupEditAvatar.loadingRender("Сохранение...");

    api.editAvatar(avatar)
    .then((userData)=> {
    userInfo.setUserInfo(userData);
  })
    .then(() => popupEditAvatar.close())
    .catch(err=>`Аватар не изменился, ошибка ${err}`)
    .finally(()=>popupEditAvatar.loadingRender("Сохранить"))
  }
 });


 //---------------------------------------------------------------------------------
const popupEditProfile = new PopupWithForm(".popup_type_edit-profile",{
  submitHandler:({name,job})=> {

  popupEditProfile.loadingRender("Сохранение...");

  api.editUserInfo(name,job)
.then((userData)=> {
  userInfo.setUserInfo(userData);
})
.then(() => popupEditProfile.close())
.catch(err=>`Профель не отредактировался, ошибка ${err}`)
.finally(()=>popupEditProfile.loadingRender("Сохранить"))
}
});
 //---------------------------------------------------------------------------------


const popupAddCard = new PopupWithForm(".popup_type_add-card",{
  submitHandler:({place,image})=> {

  popupAddCard.loadingRender("Сохранение...");

  api.addCard(place,image)
  .then((userData)=> {
  const cardItem = createCard(userData);
  cardsList.prependItem(cardItem.getElement());
})
.then(()=>  { 
  photoNameInput.value = "";
  imgLinkInput.value = ""; 
  popupAddCard.close()})
.catch(err=>`Ошибка добавления карточки ${err}`)
.finally(()=>popupAddCard.loadingRender("Создать"))
}
});


//-------------------------------------------------------------------------------------------------------
function openProfilePopup() {
  //Функция:присвоить значения input для профиля
  popupEditProfile.open();
  const user = userInfo.getUserInfo();
    nameInput.value = user.name;
    jobInput.value = user.job;
}
popupEditProfile.setEventListeners();


function openAvatarEditPopup() {
  popupEditAvatar.open();
}
popupEditAvatar.setEventListeners();

function openCardPopup() {
  popupAddCard.open();
  cardFormValidator.toggleButtonError();
}
popupAddCard.setEventListeners();

buttonEditProfile.addEventListener("click", openProfilePopup);
buttonAddNewCard.addEventListener("click",openCardPopup);
avatarProfile.addEventListener("click",openAvatarEditPopup)

//-------------------------------------------------------------------------------------------------------
const popupBigImg = new PopupWithImage(".popup_type_image-big");
popupBigImg.setEventListeners();

const popupConfirmation = new PopupWithConfirmation(".popup_type_delete-card");
popupConfirmation.setEventListeners();

//-------------------------------------------------------------------------------------------------------
function handleCardClick(name,link) {
  //Функция:открыть попап BigImg

  bigImgName.textContent = name;
  bigImg.src = link;
  bigImg.alt = name;
  popupBigImg.open(name,link);
  
 };


function createCard(data) {
  //функция создания карточки
  const card = new Card(
    data, 
    '.template', 
    handleCardClick,
    ()=> {
     popupConfirmation.open();
     popupConfirmation.focus();
     popupConfirmation.setSubmitAction( () => {
     api.deleteCard(card.getId())
     .then(()=>{
       card.deleteCard();
     })
     .then(()=> popupConfirmation.close())
     .catch(err=> console.log(`Ошибка добавления карточки ${err}`))
   })
    },
    (cardData)=>{
      api.updateLikeCard(cardData)
      .then((likesData)=>{
        card.updateLike(likesData)
      })
      .catch(err=>`Ошибка добавления лайка на карточку ${err}`)
    },
    userInfo._id);
  return card;
};


const editFormValidator = new FormValidator(popupFormEdit,validationConfig);
const cardFormValidator = new FormValidator(popupFormAdd,validationConfig);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

