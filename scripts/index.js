import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import {openPopup,escHandler,closePopup} from "./utils.js";
import {FormValidator} from "./FormValidator.js";

const buttonEditProfile = document.querySelector(
  ".profile__edit-button_type_about"
);
const buttonAddNewCard = document.querySelector(
  ".profile__add-button_type_add"
);
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupBigImg = document.querySelector(".popup_type_image-big");
const popupCloseButtonProfile = document.querySelector(
  ".popup__close-button_type_edit-profile"
);
const popupCloseButtonAdd = document.querySelector(
  ".popup__close-button_type_add-card"
);
const popupCloseButtonBig = document.querySelector(
  ".popup__close-button_type_image"
);
const popupOverlay = document.querySelector(".popup__overlay");
const nameInput = document.querySelector(".popup__input_type_name"); //input
const jobInput = document.querySelector(".popup__input_type_job"); //input
const photoNameInput = document.querySelector(".popup__input_type_photo-name"); //input
const imgLinkInput = document.querySelector(".popup__input_type_img-link"); //input
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__subtitle");
const cardContainer = document.querySelector(".elements");
const template = document.querySelector(".template");
const popupProfileOverlay = popupEditProfile.querySelector('.popup__overlay');
const popupPlaceOverlay = popupAddCard.querySelector('.popup__overlay');
const popupPicOverlay = popupBigImg.querySelector('.popup__overlay');
const bigImgName = document.querySelector(".popup__subtitle");
const bigImg = document.querySelector(".popup__img");

function openPopupProfile() {
  //Функция:открыть попап Profile
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditProfile);
}

function openPopupAddCard() {
  const button = popupAddCard.querySelector(".popup__button");
  button.disabled=true;
  button.classList.add("popup__button_disabled");
  openPopup(popupAddCard);
}

function closePopupProfile() {
  //Функция:закрыть попап Profile
  closePopup(popupEditProfile);
}

function closePopupAddCard() {
  //Функция:закрыть попап AddCard
  closePopup(popupAddCard);
}

function closePopupBigImg() {
  //Функция:закрыть попап BigImg
  closePopup(popupBigImg);
}

function handleProfileSubmit(evt) {
  //Функция:присвоить значения input для профиля
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddCard(evt) {
  //handle-обработать какое то событие
  evt.preventDefault();
  const inputText = photoNameInput.value;
  const inputLink = imgLinkInput.value;
  const cardItem = createCard({ name: inputText, link: inputLink },'.template', handleCardClick);
  cardContainer.prepend(cardItem.getElement());
  photoNameInput.value = "";
  imgLinkInput.value = "";
  closePopup(popupAddCard);
}

function handleCardClick(name,link) {
  //Функция:открыть попап BigImg

  bigImgName.textContent = name;
  bigImg.src = link;
  bigImg.alt = name;
  openPopup(popupBigImg);
 };

function createCard(data, cardSelector, handleCardClick) {
  //функция создания карточки
  const card = new Card(data, cardSelector, handleCardClick);
  return card;
};

initialCards.forEach((data) => {
  //проходим по всем карточкам и создаём их в DOM
  const ticket = createCard(data, '.template', handleCardClick);
  
  cardContainer.append(ticket.getElement());
});


const popupFormEdit = document.querySelector(".popup__form_type_edit-profile"); //form редактирование профиля
const popupFormAdd = document.querySelector(".popup__form_type_add-card"); //form добавление карточек


buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddNewCard.addEventListener("click", openPopupAddCard);
popupCloseButtonProfile.addEventListener("click", closePopupProfile);
popupCloseButtonAdd.addEventListener("click", closePopupAddCard);
popupCloseButtonBig.addEventListener("click", closePopupBigImg);
popupFormEdit.addEventListener("submit", handleProfileSubmit);
popupFormAdd.addEventListener("submit", handleAddCard);
popupProfileOverlay.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupPlaceOverlay.addEventListener('mousedown', () => {
    closePopup(popupAddCard);
});

popupPicOverlay.addEventListener('mousedown', () => {
  closePopup(popupBigImg);
});

const validationConfig = {//включает валидацию на проекте
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  };

const editFormValidator = new FormValidator(popupFormEdit,validationConfig);
const cardFormValidator = new FormValidator(popupFormAdd,validationConfig);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();




