import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Order } from "../../../../model";
import { OrdersService } from "../../service/orders.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-order-detail",
    templateUrl: "./order-detail.component.html",
    styleUrls: ["./order-detail.component.scss"]
})
export class OrderDetailComponent implements OnInit {
    order: Observable<Order>;
    constructor(
        private orderService: OrdersService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.pipe(take(1)).subscribe(params => {
            this.order = this.orderService.getOrderById(params.id);
        });
    }
}
