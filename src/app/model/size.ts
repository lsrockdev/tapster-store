export class Size {
    id: number;
    name: string;
    size: string;
    description: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.id = data.id;
        this.name = data.name;
        this.size = data.size;
        this.description = data.description;
    }
}
