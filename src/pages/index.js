import "./index.css";
import  Card  from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js"
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
  cardContainer,
  bigImgName,
  bigImg,
  popupFormEdit,
  popupFormAdd} from "../utils/constants.js";

  const cardsList = new Section ({
    items: initialCards, 
    renderer:(data)=>{
      const ticket =  createCard(data);
      const cardElement =  ticket.getElement();
      cardsList.addItem(cardElement);
  }
  },
  cardContainer
  );
  
  cardsList.renderItems();

const userInfo = new UserInfo({nameElement:nameProfile, jobElement:jobProfile});
const popupEditProfile = new PopupWithForm(".popup_type_edit-profile",
(data)=>{
  userInfo.setUserInfo(data.name,data.job);  
  popupEditProfile.close();
  console.log(data);
});


const popupAddCard = new PopupWithForm(".popup_type_add-card",handleAddCard);

function openProfilePopup() {
  //Функция:присвоить значения input для профиля
  // evt.preventDefault();
  popupEditProfile.open();
  const user = userInfo.getUserInfo();
    nameInput.value = user.name;
    jobInput.value = user.job;
    // console.log(user);
}
popupEditProfile.setEventListeners();


function handleAddCard(data) {
  //handle-обработать какое то событие
  const cardItem = createCard({ name: data["photo-name"], link: data["img-link"] });
  cardsList.prependItem(cardItem.getElement());
  photoNameInput.value = "";
  imgLinkInput.value = "";
  popupAddCard.close();
}
popupAddCard.setEventListeners();

buttonEditProfile.addEventListener("click", openProfilePopup);
buttonAddNewCard.addEventListener("click", popupAddCard.open);

// popupFormEdit.addEventListener("submit",   ()=>{ });
// popupFormAdd.addEventListener("submit",  handleAddCard);
//-------------------------------------------------------------------------------------------------------
const popupBigImg = new PopupWithImage(".popup_type_image-big");
popupBigImg.setEventListeners();

function handleCardClick(name,link) {
  //Функция:открыть попап BigImg

  bigImgName.textContent = name;
  bigImg.src = link;
  bigImg.alt = name;
  popupBigImg.open(name,link);
  
 };

function createCard(data) {
  //функция создания карточки
  const card = new Card(data, '.template', handleCardClick);
  return card;
};



// initialCards.forEach((data) => {
//   //проходим по всем карточкам и создаём их в DOM
//   const ticket = createCard(data, '.template', handleCardClick);
  
//   cardContainer.append(ticket.getElement());
// });

// popupCloseButtonProfile.addEventListener("click", closePopupProfile);
// popupCloseButtonAdd.addEventListener("click", closePopupAddCard);
// popupCloseButtonBig.addEventListener("click", closePopupBigImg);

// popupProfileOverlay.addEventListener('click', () => {
//   closePopup(popupEditProfile);
// });

// popupPlaceOverlay.addEventListener('click', () => {
//     closePopup(popupAddCard);
// });

// popupPicOverlay.addEventListener('click', () => {
//   closePopup(popupBigImg);
// });


const editFormValidator = new FormValidator(popupFormEdit,validationConfig);
const cardFormValidator = new FormValidator(popupFormAdd,validationConfig);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
