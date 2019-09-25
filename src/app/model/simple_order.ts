import { User } from "./user";

export enum OrderStatus {
    AwaitingPayment = 0,
    Paid = 1,

    Keg_Ready = 2,
    ScheduledPickup = 3,

    ClaimDeliver = 4,
    ClaimPickUp = 5,
    Declaim = 6,
    Delivered = 7,
    DeliverFailed = 8,
    Pickup = 9,
    PickupFailed = 10,
    Returned = 11
}

export class SimpleOrder {
    private static numKeys = [
        "id",
        "status",
        "total",
        "penalty",
        "kegsDeliveredQty",
        "tapsDeliveredQty",
        "kegsReturnedQty",
        "tapsReturnedQty"
    ];
    id: number;
    status: number;
    total: number;
    penalty: number;

    deliveredAt: Date;
    returnedAt: Date;
    createdAt: Date;

    kegsDeliveredQty: number;
    tapsDeliveredQty: number;
    kegsReturnedQty: number;
    tapsReturnedQty: number;

    customer: User;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        SimpleOrder.numKeys.forEach(k => (this[k] = !!data[k] ? +data[k] : 0));
        this.deliveredAt = data.deliveredAt ? new Date(data.deliveredAt) : null;
        this.returnedAt = data.returnedAt ? new Date(data.returnedAt) : null;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
        this.customer = data.Customer ? new User(data.Customer) : null;
    }

    get customerName(): string {
        return this.customer
            ? this.customer.firstName + " " + this.customer.lastName
            : "";
    }

    get statusString(): string {
        switch (this.status) {
            case OrderStatus.AwaitingPayment:
                return "New";
            case OrderStatus.Paid:
                return "New";
            case OrderStatus.Keg_Ready:
                return "Order is ready";
            case OrderStatus.ScheduledPickup:
                return "Schedule for pickup";
            case OrderStatus.ClaimDeliver:
                return "Assigned drive for deliver";
            case OrderStatus.ClaimPickUp:
                return "Drive assigned drive to pick up";
            case OrderStatus.Declaim:
                return "Declaim";
            case OrderStatus.Delivered:
                return "Delivered";
            case OrderStatus.DeliverFailed:
                return "Deliver failed";
            case OrderStatus.Pickup:
                return "Pickup";
            case OrderStatus.PickupFailed:
                return "Pickup Failed";
            case OrderStatus.Returned:
                return "Returned";
        }
        return "";
    }
}
