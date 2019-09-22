export const AdminKey = "admin";
export const TokenKey = "token";

export class Admin {
    id: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    userName: string;
    lastLogin: Date;
    gender: number;
    isFbUser: boolean;
    dob: Date;

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
        this.lastLogin = data.lastLogin;
        this.gender = data.gender;
        this.isFbUser = data.isFbUser;
        this.dob = data.dob;
    }

    public static storeToken(token: string) {
        localStorage.setItem(TokenKey, token);
    }

    public static getStoredToken(): any {
        try {
            return localStorage.getItem(TokenKey);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public static storeAdmin(data: any = {}) {
        localStorage.setItem(AdminKey, JSON.stringify(data));
    }

    public static removeAllItems() {
        localStorage.removeItem(AdminKey);
        localStorage.removeItem(TokenKey);
    }

    public static getStoredAdmin(): any {
        try {
            return JSON.parse(localStorage.getItem(AdminKey));
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
