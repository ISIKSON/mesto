const initialCards = [
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
const popupFormEdit = document.querySelector(".popup__form_type_edit-profile"); //form редактирование профиля
const popupFormAdd = document.querySelector(".popup__form_type_add-card"); //form добавление карточек
const nameInput = document.querySelector(".popup__input_type_name"); //input
const jobInput = document.querySelector(".popup__input_type_job"); //input
const photoNameInput = document.querySelector(".popup__input_type_photo-name"); //input
const imgLinkInput = document.querySelector(".popup__input_type_img-link"); //input
const bigImgName = document.querySelector(".popup__subtitle");
const bigImg = document.querySelector(".popup__img");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__subtitle");
const cardContainer = document.querySelector(".elements");
const template = document.querySelector(".template");
//---------------------------------------------------------------------------------------
function openPopup(popup) {
  //Функция:открыть попап
  popup.classList.add("popup_opened");
}

function openPopupProfile() {
  //Функция:открыть попап Profile
  openPopup(popupEditProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openPopupAddCard() {
  //Функция:открыть попап AddCard
  openPopup(popupAddCard);
}
//--------------------------------------------------------------
function closePopup(popup) {
  //Функция:закрыть попап
  popup.classList.remove("popup_opened");
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
//---------------------------------------------------------------------------------------
function deleteCard(evt) {
  //функция удаления
  const targetEl = evt.target;
  const listEl = targetEl.closest(".element");
  listEl.remove();
}
//---------------------------------------------------------------------------------------
function likeCard(evt) {
  //функция лайка
  evt.target.classList.toggle("element__like_active");
}
//---------------------------------------------------------------------------------------
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
  const cardItem = createCard({ name: inputText, link: inputLink });
  cardContainer.prepend(cardItem);
  photoNameInput.value = "";
  imgLinkInput.value = "";
  closePopup(popupAddCard);
}
//---------------------------------------------------------------------------------------
function render() {
  //Функция:добавления фото-карточки в DOM
  const cardsList = initialCards.map((element) => {
    //передали функцию из которой сделали массив
    return createCard(element);
  });
  cardContainer.append(...cardsList); //добавляем полученую строку в контейнер, append не может принимать массив, поэтому нужно использовать (...) для разделения массива на элементы
}

function createCard(element) {
  //Функция:создания фото-карточки
  const itemTemplate = template.content.cloneNode(true);
  const itemContainer = itemTemplate.querySelector(".element");
  const likeElement = itemContainer.querySelector(".element__like");
  const titleElement = itemContainer.querySelector(".element__title");
  const itemImage = itemContainer.querySelector(".element__image");
  const removeBtn = itemContainer.querySelector(".element__delete-button");
  removeBtn.addEventListener("click", deleteCard); //обработчик удаления карты
  likeElement.addEventListener("click", likeCard); //обработчик лайка
  titleElement.textContent = element.name;
  itemImage.setAttribute("src", element.link);
  itemImage.setAttribute("alt", element.link);

  itemImage.addEventListener("click", () =>
    openPopupBigImg(element.name, element.link)
  );
  function openPopupBigImg(name, link) {
    //Функция:открыть попап BigImg
    bigImgName.textContent = name;
    bigImg.src = link;
    bigImg.alt = link;
    openPopup(popupBigImg);
  }

  return itemContainer;
}
//---------------------------------------------------------------------------------------
render();
buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddNewCard.addEventListener("click", openPopupAddCard);
popupCloseButtonProfile.addEventListener("click", closePopupProfile);
popupCloseButtonAdd.addEventListener("click", closePopupAddCard);
popupCloseButtonBig.addEventListener("click", closePopupBigImg);
popupFormEdit.addEventListener("submit", handleProfileSubmit);
popupFormAdd.addEventListener("submit", handleAddCard);