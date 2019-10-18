export class Gift {
    enabled: boolean;
    for: string;
    why: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.enabled = data.enabled;
        this.for = data.for;
        this.why = data.why;
    }
}
