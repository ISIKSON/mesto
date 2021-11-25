const aboutLink= document.querySelector('.profile__edit-button_type_about');
const popup= document.querySelector('.popup');
const popupCloseButton= popup.querySelector('.popup__close-button');
const popupForm= popup.querySelector('.popup__form');
const nameInput= popup.querySelector('.popup__input_type_name');
const jobInput= popup.querySelector('.popup__input_type_job');
const nameProfile= document.querySelector('.profile__title');
const jobProfile= document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent=nameInput.value;
    jobProfile.textContent=jobInput.value;
    closePopup();
}

aboutLink.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler); 