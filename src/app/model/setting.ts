export class Setting {
    name: string;
    value: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.name = data.name;
        this.value = data.value;
    }
}
