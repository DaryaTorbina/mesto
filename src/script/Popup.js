//отвечает за открытие и закрытие попапа

//Принимает в конструктор единственный параметр — селектор попапа
class Popup {
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
      // console.log( this._popupElement)
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup__open'); 
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
     this._popupElement.classList.remove('popup__open');
     document.removeEventListener('keyup', this._handleEscClose);    
    }

    _handleEscClose (evt) {
        evt.preventDefault();
        if (evt.key === 'Escape') {
            this.close();
          };

    }

    setEventListeners() {
        this._popupElement.addEventListener ('click', (evt) => {
            if (evt.target.classList.contains('popup__open') || evt.target.classList.contains('popup__button-close')) {
                this.close();
            }
         });
    }
}

export {Popup};