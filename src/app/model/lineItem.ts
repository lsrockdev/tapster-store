import { Inventory } from "./inventory";

export class LineItem {
    id: number;
    qty: number;
    price: number;
    inventory: Inventory;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.inventory = new Inventory(data.Inventory);
    }
}
