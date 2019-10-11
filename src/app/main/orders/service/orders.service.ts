import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Order, Api, User, SimpleOrder, LineItem } from "../../../model";
import { BackendService } from "../../../services/backend.service";

@Injectable()
export class OrdersService implements Resolve<any> {
    orders: SimpleOrder[];
    onOrdersChanged: BehaviorSubject<any>;
    onChooseOrderChanged: BehaviorSubject<any>;

    lineItems: LineItem[] = [];

    constructor(private bs: BackendService) {
        this.onOrdersChanged = new BehaviorSubject({});
        this.onChooseOrderChanged = new BehaviorSubject({});
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            let params = route.params;
            if (!params.beginDate) {
                params = {
                    beginDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
                        .toISOString()
                        .slice(0, 10),
                    endDate: new Date().toISOString().slice(0, 10),
                    status: 0
                };
            }
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
                    beginDate:
                        new Date(params.beginDate).getTime() +
                        new Date().getTimezoneOffset() * 60 * 1000,
                    endDate:
                        new Date(params.endDate).getTime() +
                        new Date().getTimezoneOffset() * 60 * 1000 * 24,
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

    getOrderById(id) {
        return this.bs.get(Api.orders.getOrderById, { id }).pipe(
            map(res => {
                console.log(res);
                if (res) {
                    const order = new Order(res.order);
                    this.lineItems = order.lineItems;
                    this.onChooseOrderChanged.next(this.lineItems);
                    return order;
                }
                return null;
            })
        );
    }
}
