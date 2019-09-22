import { Size } from "./size";

export class Category {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    catgUrlImagePath: string;
    imageGuid: string;
    IsForFrattapStore: boolean;
    isMaster: boolean;
    categoryOrder: boolean;
    deliveryFee: number;
    sizes: Size[];

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.isActive = data.isActive;
        this.catgUrlImagePath = data.catgUrlImagePath;
        this.imageGuid = data.imageGuid;
        this.IsForFrattapStore = data.IsForFrattapStore;
        this.isMaster = data.isMaster;
        this.categoryOrder = data.categoryOrder;
        this.deliveryFee = data.deliveryFee;
        this.sizes = data.Sizes ? data.Sizes.map(size => new Size(size)) : [];
    }
}
