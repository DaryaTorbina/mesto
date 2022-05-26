//отвечает за отрисовку элементов на странице
//У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.

//Первым параметром конструктора принимает объект с двумя свойствами
//Свойство items — это массив данных, которые нужно
//добавить на страницу при инициализации класса/
//Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице
//Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.

export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addNewItem(item) {
    this._containerElement.prepend(item);
  }

  addItem(item) {
    this._containerElement.append(item);
  }
}
