import { Injectable } from "@angular/core";
import { User, Api, Observable, take } from "../../../model";
import { BackendService } from "../../../services/backend.service";

@Injectable()
export class AuthService {
    constructor(private bs: BackendService) {}

    public login(email: string, password: string): Promise<any> {
        return this.bs
            .publicPost(Api.auth.logIn, { email, password })
            .pipe(take(1))
            .toPromise();
    }

    public signUp(data: any): Promise<any> {
        return this.bs
            .publicPost(Api.auth.register, data)
            .pipe(take(1))
            .toPromise();
    }
}
