import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Stores, Api } from "../../../model";
import { BackendService } from "../../../services/backend.service";

@Injectable()
export class StoresService {
    constructor(private bs: BackendService) {}

    getStore(id: number): Observable<any> {
        return this.bs
            .get(Api.store.getById, { id })
            .pipe(map(res => res && new Stores(res.store)));
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
