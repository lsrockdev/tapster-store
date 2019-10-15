import { Inventory } from "./inventory";

export class LineItem {
    id: number;
    qty: number;
    price: number;
    inventory: Inventory;
    extendedPrice: number;
    deliveryfee: number;
    depositfee: number;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.inventory = new Inventory(data.Inventory);
        this.id = data.id;
        this.qty = data.qty;
        this.price = data.price;
        this.extendedPrice = data.extendedPrice;
        this.deliveryfee = data.deliveryfee || 0;
        this.depositfee = data.depositfee || 0;
    }

    get total() {
        return this.extendedPrice + this.deliveryfee + this.depositfee;
    }
}
