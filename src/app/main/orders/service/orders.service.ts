import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { SimpleOrder, Api, User } from "../../../model";
import { BackendService } from "../../../services/backend.service";

@Injectable()
export class OrdersService implements Resolve<any> {
    orders: SimpleOrder[];
    onOrdersChanged: BehaviorSubject<any>;

    constructor(private bs: BackendService) {
        this.onOrdersChanged = new BehaviorSubject({});
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getOrders()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getOrders(): Promise<any> {
        return new Promise((resolve, reject) => {
            const user = User.getStoredUser();
            this.bs
                .get(Api.orders.getAll, { storeId: user.Store.id })
                .subscribe(
                    res => {
                        this.orders = res.orders.map(
                            data => new SimpleOrder(data)
                        );
                        this.onOrdersChanged.next(this.orders);
                        resolve(this.orders);
                    },
                    error => console.log(error)
                );
        });
    }
}
