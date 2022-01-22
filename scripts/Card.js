import {openPopup,popupBigImg} from"./utils.js";

class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector; 
        this._bigImgName = document.querySelector(".popup__subtitle");
        this._bigImg = document.querySelector(".popup__img");
    }

    getElement() {
        this._element = this._getTemplate();
        // const itemImage = this._element.querySelector(".element__image");//присваиваем значение img
        // const removeBtn = this._element.querySelector(".element__delete-button");
        // const likeElement = this._element.querySelector(".element__like");
        this._itemImage = this._element.querySelector(".element__image");
        this._removeBtn = this._element.querySelector(".element__delete-button");
        this._likeElement = this._element.querySelector(".element__like");
        this._element.querySelector(".element__title").textContent = this._name;//присваиваем заголовок к h2
        this._itemImage.src = this._link;//присваиваем ссылку к src
        this._itemImage.alt = this._name;//присваиваем название к alt
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners(){
        
      this._itemImage.addEventListener("click", this._openPopupBigImg);
     
      this._removeBtn.addEventListener("click", this._deleteCard); //обработчик удаления карты
      
      this._likeElement.addEventListener("click", this._likeCard); //обработчик лайка
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
        this._bigImgName.textContent = element.textContent;
        this._bigImg.src = element.querySelector(".element__image").src;
        this._bigImg.alt = element.textContent;
        openPopup(popupBigImg);
      }

  
    }
    
      

export{Card};