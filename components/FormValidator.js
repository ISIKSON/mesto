class FormValidator {
    constructor(form, validationConfig) {
        this._form = form;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;

    }

    _showError = (input,errorMessageText) => {//функция устанавливающая ошибку по форме
        const errorMessage = this._form.querySelector(`#${input.id}-error`);//привязываем определённый spqn к определённому input
        errorMessage.textContent = errorMessageText;//добавляем текст ошибки
        errorMessage.classList.add(this._errorClass);//добавляем класс к span
        input.classList.add(this._inputErrorClass);//добавляем класс к input
    }

    _hideError = (input) => {//функция скрывающая ошибку по форме
        const errorMessage = this._form.querySelector(`#${input.id}-error`);//привязываем определённый span к определённому input
        errorMessage.textContent = '';//удаляем текст ошибки
        errorMessage.classList.remove(this._errorClass);//удаляем класс у span
        input.classList.remove(this._inputErrorClass);//удаляем класс у input
    }

    _hasInvalidInput = () => {//функция проверки input на валидность
        return this._inputList.some((input) => !input.validity.valid);//хотябы один input имеет ошибку(не валидный), из nodlist в массив с помощью Array
    }

    _toggleButtonError = () => {//функция активности кнопки
        // console.log(hasInvalidInput(inputs))    
        if (this._hasInvalidInput(this._inputList)) {//если хотябы один input имеет ошибку
            this._submitButton.classList.add(this._inactiveButtonClass);//добавляем кнопке класс
            this._submitButton.disabled = true;//кнопка не активна
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);//удаляем у кнопки класс
            this._submitButton.disabled = false;//кнопка активна
        }
    }

    _checkIfInputValid = (input) => {//функция проверки input на валидность
        if (!input.validity.valid) {
            
            this._showError(input, input.validationMessage);//вызов функции показ. ошибку
        } else {
            this._hideError(input);//вызов функции скрыв. ошибку
        }
        // console.log(input);
    }

    _setInputListeners = () => {//функ. поиска инпутов внутри формы
       
    
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkIfInputValid(input);//вызов функции проверки input на валидность
                this._toggleButtonError();
            });
        });
    }

    enableValidation = () => {//функция вкл. валидации на проекте с помощью диструктаризации достаём formSelector и остаток из объекта с помощью rest
    
            this._form.addEventListener('submit', (event) => {
                event.preventDefault();//отмена отправки на сервер по умолчанию
            });
    
            this._setInputListeners();//вызов функции
        };


}


export{FormValidator}; 
