import { Category } from "./category";

export class DeliveryFee {
    id: number;
    deliveryfee: number;
    tapfee: number;
    unit: number;
    category: Category;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.id = data.id;
        this.deliveryfee = data.deliveryfee;
        this.tapfee = data.tapfee;
        this.unit = data.unit;
        this.category = data.category ? new Category(data.category) : null;
    }
}
