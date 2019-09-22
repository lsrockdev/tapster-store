import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { Admin } from "../model";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return !!Admin.getStoredToken()
            ? true
            : (this.router.navigate(["/login"]), false);
    }
}
