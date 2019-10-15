import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User, Stores } from "../../../model";
import { StoresService } from "../service/stores.service";

@Component({
    selector: "app-store",
    templateUrl: "./store.component.html",
    styleUrls: ["./store.component.scss"]
})
export class StoreComponent implements OnInit {
    store: Observable<Stores>;

    constructor(private storesService: StoresService) {
        const user = User.getStoredUser() || {};
        this.store = this.storesService.getStore(user.Store.id);
    }

    ngOnInit() {}
}
