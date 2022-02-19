import Popup from "../components/Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._popupElement=document.querySelector(".popup__button_type_delete-card");
    }

    setSubmitAction(func) {
        this._submitHandler = func;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._formSubmitHandler);
    }

    _formSubmitHandler = (evt) => {
        evt.preventDefault();
        this._submitHandler();
    }

    focus() {
        this._popupElement.focus();
    }
}