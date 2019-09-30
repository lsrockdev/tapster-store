import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Order } from "../../../../model";
import { OrdersService } from "../../service/orders.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, fromEvent, merge, Subject } from "rxjs";
import { MatPaginator, MatSort } from "@angular/material";
import {
    debounceTime,
    distinctUntilChanged,
    map,
    takeUntil
} from "rxjs/operators";
import { DataSource } from "@angular/cdk/collections";
import { FuseUtils } from "@fuse/utils";

@Component({
    selector: "app-order-detail",
    templateUrl: "./order-detail.component.html",
    styleUrls: ["./order-detail.component.scss"]
})
export class OrderDetailComponent implements OnInit {
    order: Observable<Order>;
    dataSource: LineItemsDataSource | null;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    displayedColumns = [
        "product",
        "store",
        "kegType",
        "size",
        "deliverFee",
        "price",
        // "tapDeliveryFee",
        // "tapDepositeFee",
        "quantity",
        "total"
    ];

    constructor(
        private orderService: OrdersService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.pipe(take(1)).subscribe(params => {
            this.order = this.orderService.getOrderById(params.id);
        });
        this.dataSource = new LineItemsDataSource(
            this.orderService,
            this.paginator,
            this.sort
        );
    }
}

export class LineItemsDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private orderService: OrdersService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();
        this.filteredData = this.orderService.lineItems;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.orderService.onChooseOrderChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this.orderService.lineItems.slice();
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === "") {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matSort.active) {
                case "name":
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case "code":
                    [propertyA, propertyB] = [a.uid, b.uid];
                    break;
                case "city":
                    [propertyA, propertyB] = [a.address.city, b.address.city];
                    break;
                case "description":
                    [propertyA, propertyB] = [a.description, b.description];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void {}
}
