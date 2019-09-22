export class Address {
    private static strKeys = [
        "state",
        "city",
        "address1",
        "address2",
        "address3",
        "latitude",
        "longitude",
        "zipCode"
    ];
    state: string;
    city: string;
    address1: string;
    address2: string;
    address3: string;
    latitude: string;
    longitude: string;
    zipCode: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        Address.strKeys.forEach(k => (this[k] = data[k]));
    }
}
