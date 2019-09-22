export class StoreCode {
    id: number;
    code: string;
    store_id: string;
    store_name: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.id = data.id;
        this.code = data.code;
        this.store_id = data.store_id;
        this.store_name = data.store_name;
    }

    get hasStore(): boolean {
        return !!this.store_id;
    }
}
