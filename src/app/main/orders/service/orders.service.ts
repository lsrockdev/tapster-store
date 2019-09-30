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
            const params = route.params;
            Promise.all([this.getOrders(params)]).then(() => {
                resolve();
            }, reject);
        });
    }

    getOrders(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const user = User.getStoredUser();
            this.bs
                .get(Api.orders.getAll, {
                    ...params,
                    storeId: user.Store.id
                })
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
