import { Product } from "./product";
import { Category } from "./category";
import { Size } from "./size";

export class Inventory {
    id: number;
    product: Product;
    category: Category;
    size: Size;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.product = new Product(data.Product);
        this.category = new Category(data.Category);
        this.size = new Size(data.Size);
    }
}
