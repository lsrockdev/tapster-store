import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Stores, Api } from "../../../model";
import { BackendService } from "../../../services/backend.service";

@Injectable()
export class StoresService {
    constructor(private bs: BackendService) {}

    getStore(id: number) {
        return new Promise((resolve, reject) => {
            this.bs.get(Api.store.getById, { id }).subscribe(
                res => {
                    const store = new Stores(res);
                    resolve(store);
                },
                error => console.log(error)
            );
        });
    }

    updateStore(data: any) {
        return new Promise((resolve, reject) => {
            this.bs.post(Api.store.update, data).subscribe(
                res => {
                    resolve(res);
                },
                error => console.log(error)
            );
        });
    }
}
