import { Address } from "./address";

export class Order {
    private static numKeys = [
        "id",
        "subtotal",
        "tax",
        "status",
        "discount",
        "total",
        "totalPaidToStore",
        "tip",
        "penalty",
        "slotStart",
        "slotEnd",
        "refundedAmount",
        "kegsDeliveredQty",
        "tapsDeliveredQty",
        "tapsReturnedQty",
        "customerId",
        "storeId"
    ];
    id: number;
    deliveryAddress: Address;
    status: number;
    billingAddress: Address;
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    totalPaidToStore: number;
    tip: number;
    deliveryFees: number;
    failedStatus: boolean;
    penalty: number;
    deliveredAt: Date;
    returnedAt: Date;
    slotStart: number;
    slotEnd: number;
    refundedAmount: number;
    kegsDeliveredQty: number;
    tapsDeliveredQty: number;
    kegsReturnedQty: number;
    tapsReturnedQty: number;
    customerId: number;
    storeId: number;
    paymentCompleted: boolean;
    stripeToken: string;
    createdAt: Date;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        Order.numKeys.forEach(k => (this[k] = !!data[k] ? +data[k] : 0));
        this.deliveryAddress = data.deliveryAddress
            ? new Address(data.deliveryAddress)
            : null;
        this.deliveryAddress = data.billingAddress
            ? new Address(data.billingAddress)
            : null;
        this.deliveredAt = data.deliveredAt ? new Date(data.deliveredAt) : null;
        this.returnedAt = data.returnedAt ? new Date(data.returnedAt) : null;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    }
}
