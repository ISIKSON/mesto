export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

export const validationConfig = {//включает валидацию на проекте
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',  
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
    };

  export  const buttonEditProfile = document.querySelector(
    ".profile__edit-button_type_about"
  );
  export const buttonAddNewCard = document.querySelector(
    ".profile__add-button_type_add"
  );
  // export  const popupEditProfile = document.querySelector(".popup_type_edit-profile");
  // export  const popupAddCard = document.querySelector(".popup_type_add-card");
  // export  const popupBigImg = document.querySelector(".popup_type_image-big");
  export  const popupCloseButtonProfile = document.querySelector(
    ".popup__close-button_type_edit-profile"
  );
  export  const popupCloseButtonAdd = document.querySelector(
    ".popup__close-button_type_add-card"
  );
  export  const popupCloseButtonBig = document.querySelector(
    ".popup__close-button_type_image"
  );
  export  const popupOverlay = document.querySelector(".popup__overlay");
  export  const nameInput = document.querySelector(".popup__input_type_name"); //input
  export  const jobInput = document.querySelector(".popup__input_type_job"); //input
  export  const photoNameInput = document.querySelector(".popup__input_type_photo-name"); //input
  export  const imgLinkInput = document.querySelector(".popup__input_type_img-link"); //input
  export  const nameProfile = document.querySelector(".profile__title");
  export  const jobProfile = document.querySelector(".profile__subtitle");
  export  const avatarProfile = document.querySelector(".profile__avatar");
  export  const cardContainer = document.querySelector(".elements");
  export  const template = document.querySelector(".template");
  // export  const popupProfileOverlay = popupEditProfile.querySelector('.popup__overlay');
  // export  const popupPlaceOverlay = popupAddCard.querySelector('.popup__overlay');
  // export  const popupPicOverlay = popupBigImg.querySelector('.popup__overlay');
  export  const bigImgName = document.querySelector(".popup__subtitle");
  export  const bigImg = document.querySelector(".popup__img");
  // export  const button = document.querySelector(".popup__button");

  
  export  const popupFormEdit = document.querySelector(".popup__form_type_edit-profile"); //form редактирование профиля
  export  const popupFormAdd = document.querySelector(".popup__form_type_add-card"); //form добавление карточек