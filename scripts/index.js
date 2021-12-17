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
const popupProfileOverlay = popupEditProfile.querySelector('.popup__overlay');
const popupPlaceOverlay = popupAddCard.querySelector('.popup__overlay');
const popupPicOverlay = popupBigImg.querySelector('.popup__overlay');
//---------------------------------------------------------------------------------------
function openPopup(popup) {
  //Функция:открыть попап
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escHandler);
}

function openPopupProfile() {
  //Функция:открыть попап Profile
  
  if(nameInput.value ===''&& jobInput.value===''){
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  }
  openPopup(popupEditProfile);
}

function openPopupAddCard() {

  const button = popupAddCard.querySelector(".popup__button");
  button.disabled=true;
  button.classList.add("popup__button_disabled");
  openPopup(popupAddCard);
  
}
//--------------------------------------------------------------
function closePopup(popup) {
  //Функция:закрыть попап
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escHandler);
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

function escHandler(evt) {
  //Функция:закрыть попап BigImg
  if(evt.key==='Escape'){
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
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
popupOverlay.addEventListener("click", closePopupProfile);
popupCloseButtonProfile.addEventListener("click", closePopupProfile);
popupCloseButtonAdd.addEventListener("click", closePopupAddCard);
popupCloseButtonBig.addEventListener("click", closePopupBigImg);
popupFormEdit.addEventListener("submit", handleProfileSubmit);
popupFormAdd.addEventListener("submit", handleAddCard);
popupProfileOverlay.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupPlaceOverlay.addEventListener('click', () => {
    closePopup(popupAddCard);
});

popupPicOverlay.addEventListener('click', () => {
  closePopup(popupBigImg);
});