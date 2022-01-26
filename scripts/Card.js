class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    getElement() {
        this._element = this._getTemplate();
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
        
      this._itemImage.addEventListener("click", () => { this._handleCardClick(this._name, this._link) });
     
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
   

    _deleteCard = () => {    
        //функция удаления
        this._element.remove();
        this._element = '';
      }

      _likeCard(evt) {
        //функция лайка
        evt.target.classList.toggle("element__like_active");
      }

    }
    
export{Card};