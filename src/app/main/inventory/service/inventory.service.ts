import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Api, Inventory, User } from "../../../model";
import { BackendService } from "../../../services/backend.service";

@Injectable()
export class InventoryService implements Resolve<any> {
    inventories: Inventory[];
    onInventoriesChanged: BehaviorSubject<any>;

    constructor(private bs: BackendService) {
        this.onInventoriesChanged = new BehaviorSubject({});
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getInventories()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getInventories(): Promise<any> {
        return new Promise((resolve, reject) => {
            const user = User.getStoredUser();
            this.bs
                .get(Api.inventory.getAll, { storeId: user.Store.id })
                .subscribe(
                    res => {
                        this.inventories = res.inventories.map(
                            data => new Inventory(data)
                        );
                        this.onInventoriesChanged.next(this.inventories);
                        resolve(this.inventories);
                    },
                    error => console.log(error)
                );
        });
    }
}
