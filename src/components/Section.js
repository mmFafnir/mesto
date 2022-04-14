

export default class Section {

    constructor(obj, container) {
        this.items = obj.items;
        this.renderer  = obj.renderer;
        this.container = document.querySelector(container);
    }

    renderAll() {
        this.items.forEach(item => {
            this.renderer(item, this.container)
        });
    }
    addItem(HTML) {
        this.container.prepend(HTML);
    }   
}
