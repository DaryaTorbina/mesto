//отвечает за отрисовку элементов на странице
//У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.

//Первым параметром конструктора принимает объект с двумя свойствами
//Свойство items — это массив данных, которые нужно
//добавить на страницу при инициализации класса/
//Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице
//Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.


class Section {
    constructor ({items,renderer}, containerSelector){
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(){
        this._initialArray.forEach((item) => {
            this._renderer(item);            
        });
    }

    //принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {
        this._container.prepend(element);
    }
}
export {Section}