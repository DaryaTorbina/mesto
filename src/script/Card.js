class Card {
    constructor( data, cardSelector, {handleCardClick}) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }
  
 //клонируем
    _getTemplate() {
      this._element = document.querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  
      return this._element;
    }
  
    //лайк
    _like() {
      this._buttonLike.classList.toggle('element__like_active');
    }

    // удаление
    _deleteCard() {
      this._element.remove();
      this._element = null;
    }
    _setEventListeners() {
      //лайк
      this._buttonLike.addEventListener('click', () => {
        this._like();
      });
      //удаление
      this._buttonDelete.addEventListener('click', () => {
        this._deleteCard();
      });
      //просмотр картинки
      this._elementCardImage.addEventListener('click', () => {
       this._handleCardClick();

      });
    }
    //создание карточки
    generateCard() {
      this._element = this._getTemplate();
      this._buttonLike = this._element.querySelector('.element__like');
      this._buttonDelete = this._element.querySelector('.element__delete');
      this._elementCardImage = this._element.querySelector('.element__image');
      this._elementTitle = this._element.querySelector('.element__name');
      this._setEventListeners();
      this._elementCardImage.src = this._link;
      this._elementCardImage.alt = this._name;
      this._elementTitle.textContent = this._name;
      return this._element;
    }
  }
  export {Card};
 