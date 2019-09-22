import { Address } from "./address";

export class Stores {
    private static strKeys = [
        "name",
        "logo",
        "websiteUrl",
        "uid",
        "description",
        "stripeToken"
    ];
    private static numKeys = ["id", "taxPercentage", "userId"];

    id: number;
    name: string;
    isActive: boolean;
    logo: string;
    taxPercentage: number;
    websiteUrl: string;
    numberOfDays: number;
    uid: string;
    description: string;
    isFrattapStore: boolean;
    userId: number;
    stripeToken: string;
    address: Address;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        Stores.strKeys.forEach(k => (this[k] = data[k]));
        Stores.numKeys.forEach(k => (this[k] = +data[k]));
        this.isActive = data.isActive;
        this.address = new Address(data.address);
    }
}
