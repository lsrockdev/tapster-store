export class Driver {
    id: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    userName: string;
    code: string;
    gender: number;
    dob: Date;
    isActive: boolean;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.id = data.id;
        this.email = data.email;
        this.phone = data.phone;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.userName = data.userName;
        this.gender = data.gender;
        this.dob = data.dob;
        this.code = data.code;
        this.isActive = data.isActive;
    }

    get codeNumber(): number {
        if (this.code) {
            const codeNum = parseInt(this.code.substring(6));
            return !!codeNum ? codeNum : 0;
        }
        return 0;
    }
}
