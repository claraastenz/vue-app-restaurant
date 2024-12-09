export default class CartItem {
    constructor(menuItem, quantity = 1) {
        this.id = menuItem.id;
        this.name = menuItem.name;
        this.price = menuItem.price;
        this.image = menuItem.image;
        this.quantity = quantity;
    }

    increment() {
        this.quantity += 1;
    }

    totalPrice() {
        return this.price * this.quantity;
    }
}
