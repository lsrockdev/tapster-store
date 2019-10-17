export class Slot {
    id: number;
    start: Date;
    finish: Date;
    isMaxedOut: boolean;
    maxDeliveriesAllowed: boolean;
    isSelectable: boolean;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.id = data.id;
        this.start = new Date(data.start);
        this.finish = new Date(data.finish);
        this.isMaxedOut = data.isMaxedOut;
        this.maxDeliveriesAllowed = data.maxDeliveriesAllowed;
        this.isSelectable = data.isSelectable;
    }
}
