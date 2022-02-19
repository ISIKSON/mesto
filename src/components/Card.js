export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteBtnClick,
    handleLike,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleLike = handleLike;
    this._isLiked = this._likes.some((item) => {
      return item._id === userId;
    });
  }

  getElement() {
    this._element = this._getTemplate();
    this._itemImage = this._element.querySelector(".element__image");
    this._removeBtn = this._element.querySelector(".element__delete-button");
    this._likeElement = this._element.querySelector(".element__like");
    this._likesCounter = this._element.querySelector(".element__likes-counter");
    this._likesCounter.textContent = this._likes.length;
    this._element.querySelector(".element__title").textContent = this._name; //присваиваем заголовок к h2
    this._itemImage.src = this._link; //присваиваем ссылку к src
    this._itemImage.alt = this._name; //присваиваем название к alt
    this._setEventListeners();
    this._checkIfOwnerCard();
    this.setIsLiked();

    return this._element;
  }

  _checkIfOwnerCard() {
    if (this._userId !== this._ownerId) {
      this._removeBtn.classList.add("element__delete-button_inactive");
    }
  }

  _setEventListeners() {
    this._itemImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._removeBtn.addEventListener("click", this._handleDeleteBtnClick); //обработчик удаления карты

    this._likeElement.addEventListener("click", () => this._handleLike(this)); //обработчик лайка
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  getId() {
    return this._id;
  }

  deleteCard = () => {
    //функция удаления
    this._element.remove();
    this._element = "";
  };

  // _likeCard(evt) {
  //   //функция лайка
  //   evt.target.classList.toggle("element__like_active");
  // }

  setIsLiked() {
    if (this._isLiked) {
      this._likeElement.classList.add("element__like_active");
    }
  }

  updateLike(data) {
    if (this._isLiked) {
      this._deleteLike(data);
    } else {
      this._addLike(data);
    }
  }

  _deleteLike(data) {
    this._likesCounter.textContent = data.likes.length;
    this._likeElement.classList.remove("element__like_active");
    this._isLiked = false;
  }

  _addLike(data) {
    this._likesCounter.textContent = data.likes.length;
    this._likeElement.classList.add("element__like_active");
    this._isLiked = true;
  }
}
