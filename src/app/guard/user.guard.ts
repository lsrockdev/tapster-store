import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { User } from "../model";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return !!User.getStoredToken()
            ? true
            : (this.router.navigate(["/login"]), false);
    }
}
