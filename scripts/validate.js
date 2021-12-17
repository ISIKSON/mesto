const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {//функция устанавливающая ошибку по форме
    const errorMessage = form.querySelector(`#${input.id}-error`);//привязываем определённый spqn к определённому input
    errorMessage.textContent = errorMessageText;//добавляем текст ошибки
    errorMessage.classList.add(errorMessageClass);//добавляем класс к span
    input.classList.add(inputErrorClass);//добавляем класс к input
}
//----------------------------------------------------------------------------------------------------
const hideError = (form, input, errorMessageClass, inputErrorClass) => {//функция скрывающая ошибку по форме
    const errorMessage = form.querySelector(`#${input.id}-error`);//привязываем определённый span к определённому input
    errorMessage.textContent = '';//удаляем текст ошибки
    errorMessage.classList.remove(errorMessageClass);//удаляем класс у span
    input.classList.remove(inputErrorClass);//удаляем класс у input
}
//----------------------------------------------------------------------------------------------------
const hasInvalidInput = (inputs) => {//функция проверки input на валидность
    return Array.from(inputs).some((el) => !el.validity.valid);//хотябы один input имеет ошибку(не валидный), из nodlist в массив с помощью Array
}
//----------------------------------------------------------------------------------------------------
const toggleButtonError = (inputs, button, inactiveButtonClass) => {//функция активности кнопки
    console.log(hasInvalidInput(inputs))
    if (hasInvalidInput(inputs)) {//если хотябы один input имеет ошибку
        button.classList.add(inactiveButtonClass);//добавляем кнопке класс
        button.disabled = true;//кнопка не активна
    } else {
        button.classList.remove(inactiveButtonClass);//удаляем у кнопки класс
        button.disabled = false;//кнопка активна
    }
}
//----------------------------------------------------------------------------------------------------
const checkIfInputValid = (form, input, { inputErrorClass, errorClass }) => {//функция проверки input на валидность
    if (!input.validity.valid) {
        showError(form, input, input.validationMessage, errorClass, inputErrorClass);//вызов функции показ. ошибку
    } else {
        hideError(form, input, errorClass, inputErrorClass);//вызов функции скрыв. ошибку
    }
}
//----------------------------------------------------------------------------------------------------
const setInputListeners = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {//функ. поиска инпутов внутри формы
    const inputs = form.querySelectorAll(inputSelector);//находи input внутри функции
    const submitButton = form.querySelector(submitButtonSelector);//находи кнопку внутри функции

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkIfInputValid(form, input, rest);//вызов функции проверки input на валидность
            toggleButtonError(inputs, submitButton,inactiveButtonClass);
        });
    });
}
//----------------------------------------------------------------------------------------------------
const enableValidation = ({ formSelector, ...rest }) => {//функция вкл. валидации на проекте с помощью диструктаризации достаём formSelector и остаток из объекта с помощью rest
    const forms = document.querySelectorAll(formSelector);

    forms.forEach((form) => {//проходим по всем формам
        form.addEventListener('submit', (event) => {
            event.preventDefault();//отмена отправки на сервер по умолчанию
        });

        setInputListeners(form, rest);//вызов функции
    });
}
//----------------------------------------------------------------------------------------------------
enableValidation({//включает валидацию на проекте
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
