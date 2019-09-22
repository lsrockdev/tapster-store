export class OrderStatus {
    code: number;
    name: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.code = data.code;
        this.name = data.name;
    }
}
