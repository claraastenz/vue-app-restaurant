export default class MenuItem {
    constructor(id, name, description, price, image, nutrition = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.nutrition = nutrition;
    }
}