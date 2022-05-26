// ".element__delete" ".element__like");".element__like-count");".element__image");".element__delete").remove();
//     }".element__name");"element__like_active""element__like_active");

export default class Card {
  constructor({
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleLikeButtonClick,
    handleRemoveButtonClick,
  }) {
    this._userId = userId;
    this._userMesto = userId === data.owner._id;
    this._imageLink = data.link;
    this._imageName = data.name;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
  }
  // находим в dom и клонируем
  _getTemplateElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _setEventListeners() {
    if (this._userMesto) {
      this._element
        .querySelector(".element__delete")
        .addEventListener("click", (evt) => {
          this._handleRemoveButtonClick(evt);
        });
    }
    this._buttonLike.addEventListener("click", (evt) =>
      this._handleLikeButtonClick(evt)
    );
    this._elementCardImage.addEventListener("click", () =>
      this._handleCardClick()
    );
  }
  //переписала .путаница в переменных
  generateCard() {
    this._element = this._getTemplateElement();
    this._buttonLike = this._element.querySelector(".element__like");
    this._countLikeElement = this._element.querySelector(
      ".element__like-count"
    );
    this._elementCardImage =
      this._element.querySelector(".element__image");
    if (!this._userMesto) {
      this._element.querySelector(".element__delete").remove();
    }

    this._elementCardImage.src = this._imageLink;
    this._elementCardImage.alt = this._imageName;
    this._element.querySelector(".element__name").textContent = this._name;
    this._countLikeElement.textContent = this._likes.length;

    this._toggleLikeState();
    this._setEventListeners();

    return this._element;
  }

  _toggleLikeState() {
    if (this._checkUserLike()) {
      this.setLike();
    } else {
      this.removeLike();
    }
  }

  setLike() {
    this._buttonLike.classList.add("element__like_active");
    this.isLiked = true;
  }

  removeLike() {
    this._buttonLike.classList.remove("element__like_active");
    this.isLiked = false;
  }

  updateLikes(data) {
    this._countLikeElement.textContent = data.length;
  }

  _checkUserLike() {
    return this._likes.some((item) => item._id === this._userId);
  }

  getCardId() {
    return this._cardId;
  }
}
