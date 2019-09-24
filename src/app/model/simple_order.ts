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

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        SimpleOrder.numKeys.forEach(k => (this[k] = !!data[k] ? +data[k] : 0));
        this.deliveredAt = data.deliveredAt ? new Date(data.deliveredAt) : null;
        this.returnedAt = data.returnedAt ? new Date(data.returnedAt) : null;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    }
}
