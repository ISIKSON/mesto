import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector,submitHandler) {
        super(popupSelector);

        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector(".popup__form");
        
    }

    _getInputValue() {
        this._formInputs = this._popup.querySelectorAll(".popup__input");
        this._formValues = {};

        this._formInputs.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._formSubmitHandler);
    }

    _formSubmitHandler = (evt) => {
        evt.preventDefault();
        this._submitHandler(this._getInputValue());
    }

    close() {
        super.close();

        this._form.reset();
    }
}
