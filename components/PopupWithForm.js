import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector,handleFormSubmit) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
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
        this._form.addEventListener("submit", this._handleFormSubmit);
    }

    close() {
        super.close();

        this._form.reset();
    }
}