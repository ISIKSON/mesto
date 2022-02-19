export default class Section {
    constructor( renderer, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;//DOM-элемент, найденный по селектору containerSelector 
    }

    renderItems(items) {//перебирает массив данных _renderedItems. Вызывает для каждого элемента массива метод addItem
        this.clear();

        items.forEach(data => {
            this._renderer(data);
        })
    }

    clear() {//Метод удаляет всё содержимое поля _container
        this._container.innerHTML = '';
    }

    addItem(element) {//принимает параметр element и вставляет его в контейнер методом append
        this._container.append(element);
    }

    prependItem(element) {
        this._container.prepend(element)
    }
}