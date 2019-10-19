import { User, Slot } from "../../model";

export enum OrderStatus {
    Paid = 0,

    ClaimDeliver = 1,
    ClaimPickUp = 2,

    Delivered = 3,
    Pickup = 4,

    DeliverFailed = 5,
    PickupFailed = 6,
    Returned = 7
}

export class SimpleOrder {
    private static numKeys = [
        "id",
        "status",
        "total",
        "tip",
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
    tip: number;

    deliveredAt: Date;
    returnedAt: Date;
    createdAt: Date;
    pickupAt: Date;

    kegsDeliveredQty: number;
    tapsDeliveredQty: number;
    kegsReturnedQty: number;
    tapsReturnedQty: number;

    customer: User;
    slot: Slot;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        SimpleOrder.numKeys.forEach(k => (this[k] = !!data[k] ? +data[k] : 0));
        this.deliveredAt = data.deliveredAt ? new Date(data.deliveredAt) : null;
        this.returnedAt = data.returnedAt ? new Date(data.returnedAt) : null;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
        this.pickupAt = data.pickupAt ? new Date(data.pickupAt) : null;
        this.customer = data.Customer ? new User(data.Customer) : null;
        this.slot = new Slot(data.Slot);
    }

    get customerName(): string {
        return this.customer
            ? this.customer.firstName + " " + this.customer.lastName
            : "";
    }

    get statusString(): string {
        switch (this.status) {
            case OrderStatus.Paid:
                return "New";
            case OrderStatus.ClaimDeliver:
                return "Claim deliver";
            case OrderStatus.ClaimPickUp:
                return "Claim pick up";
            case OrderStatus.Delivered:
                return "Delivered";
            case OrderStatus.DeliverFailed:
                return "Delivery Failed";
            case OrderStatus.Pickup:
                return "Pickup";
            case OrderStatus.PickupFailed:
                return "Pickup Failed";
            case OrderStatus.Returned:
                return "Returned";
        }
        return "";
    }

    get deliveryDate(): Date {
        return this.deliveredAt;
    }

    get scheduledDate(): Date {
        return this.slot.start;
    }
}
