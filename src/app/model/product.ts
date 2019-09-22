import { Category } from "./category";

export class Product {
    private static strKeys = ["name", "description", "imageUrl", "imageGuide"];
    private static numKeys = [
        "id",
        "categoryId",
        "isKeg",
        "depositFee",
        "deliveryFee",
        "price",
        "storeId"
    ];

    id: number;
    name: string;
    description: string;
    isActive: boolean;
    imageUrl: string;
    imageGuide: string;
    categoryId: number;
    isKeg: number;
    depositFee: number;
    deliveryFee: number;
    price: number;
    storeId: number;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        Product.strKeys.forEach(k => (this[k] = data[k]));
        Product.numKeys.forEach(k => (this[k] = +data[k]));
    }
}
