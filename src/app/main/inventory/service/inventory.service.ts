import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Api, Inventory, User, Product, Size } from "../../../model";
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

    getActiveProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.bs.get(Api.inventory.getActiveProducts).subscribe(
                res => {
                    const products = res.products.map(
                        data => new Product(data)
                    );
                    resolve(products);
                },
                error => console.log(error)
            );
        });
    }

    getCategorySizes(categoryId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.bs
                .get(Api.inventory.getCategorySizes, { categoryId })
                .subscribe(
                    res => {
                        const sizes = res.sizes.map(data => new Size(data));
                        resolve(sizes);
                    },
                    error => console.log(error)
                );
        });
    }
}
