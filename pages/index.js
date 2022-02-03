import  Card  from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {initialCards, validationConfig} from "../utils/constants.js";
import {
  buttonEditProfile,
  buttonAddNewCard,
  popupCloseButtonProfile,
  popupCloseButtonAdd,
  popupCloseButtonBig,
  popupOverlay,
  nameInput,
  jobInput,
  photoNameInput,
  imgLinkInput,
  nameProfile,
  jobProfile,
  cardContainer,
  template,
  bigImgName,
  bigImg,
  button,
  popupFormEdit,
  popupFormAdd} from "../utils/constants.js";


// function openPopupProfile() {
//   //Функция:открыть попап Profile
//   nameInput.value = nameProfile.textContent;
//   jobInput.value = jobProfile.textContent;
//   openPopup(popupEditProfile);
// }

// function openPopupAddCard() {
  
//   button.disabled=true;
//   button.classList.add("popup__button_disabled");
//   openPopup(popupAddCard);
// }

// function closePopupProfile() {
//   //Функция:закрыть попап Profile
//   closePopup(popupEditProfile);
// }

// function closePopupAddCard() {
//   //Функция:закрыть попап AddCard
//   closePopup(popupAddCard);
// }

// function closePopupBigImg() {
//   //Функция:закрыть попап BigImg
//   closePopup(popupBigImg);
// }

const popupEditProfile = new PopupWithForm(".popup_type_edit-profile",handleProfileSubmit);
const popupAddCard = new PopupWithForm(".popup_type_add-card",handleAddCard);

function handleProfileSubmit(evt) {
  //Функция:присвоить значения input для профиля
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  
}
popupEditProfile.setEventListeners();

function handleAddCard(evt) {
  //handle-обработать какое то событие
  evt.preventDefault();
  const inputText = photoNameInput.value;
  const inputLink = imgLinkInput.value;
  const cardItem = createCard({ name: inputText, link: inputLink },'.template', handleCardClick);
  cardContainer.prepend(cardItem.getElement());
  photoNameInput.value = "";
  imgLinkInput.value = "";
  
}
popupAddCard.setEventListeners();

buttonEditProfile.addEventListener("click", popupEditProfile.open);
buttonAddNewCard.addEventListener("click", popupAddCard.open);

const popupBigImg = new PopupWithImage(".popup_type_image-big");

function handleCardClick(name,link) {
  //Функция:открыть попап BigImg

  bigImgName.textContent = name;
  bigImg.src = link;
  bigImg.alt = name;
  popupBigImg.open(name,link);
  popupBigImg.setEventListeners();
 };

function createCard(data) {
  //функция создания карточки
  const card = new Card(data, '.template', handleCardClick);
  return card;
};

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

// initialCards.forEach((data) => {
//   //проходим по всем карточкам и создаём их в DOM
//   const ticket = createCard(data, '.template', handleCardClick);
  
//   cardContainer.append(ticket.getElement());
// });





// popupCloseButtonProfile.addEventListener("click", closePopupProfile);
// popupCloseButtonAdd.addEventListener("click", closePopupAddCard);
// popupCloseButtonBig.addEventListener("click", closePopupBigImg);
popupFormEdit.addEventListener("submit", popupEditProfile.close);
popupFormAdd.addEventListener("submit", popupAddCard.close);
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
