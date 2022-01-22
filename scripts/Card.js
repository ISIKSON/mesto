import {openPopup,popupBigImg} from"./utils.js";

class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        // console.log(cardSelector);
    }

    getElement() {
        this._element = this._getTemplate();
        const itemImage = this._element.querySelector(".element__image");//присваиваем значение img
        this._element.querySelector(".element__title").textContent = this._name;//присваиваем заголовок к h2
        itemImage.src = this._link;//присваиваем ссылку к src
        itemImage.alt = this._name;//присваиваем название к alt
        itemImage.addEventListener("click", this.openPopupBigImg);
        const removeBtn = this._element.querySelector(".element__delete-button");
        removeBtn.addEventListener("click", this.deleteCard); //обработчик удаления карты
        const likeElement = this._element.querySelector(".element__like");
        likeElement.addEventListener("click", this.likeCard); //обработчик лайка

        return this._element;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    deleteCard = () => {    
        //функция удаления
        this._element.remove();
        this._element = '';
      }

      likeCard(evt) {
        //функция лайка
        evt.target.classList.toggle("element__like_active");
      }

       openPopupBigImg (data) {
        //Функция:открыть попап BigImg
        const eventTarget = data.target;
        const element = eventTarget.closest(".element");
        bigImgName.textContent = element.textContent;
        bigImg.src = element.querySelector(".element__image").src;
        bigImg.alt = element.textContent;
        openPopup(popupBigImg);
      }
    }
    
      const bigImgName = document.querySelector(".popup__subtitle");
      const bigImg = document.querySelector(".popup__img");

export{Card};