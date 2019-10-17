import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import {
    BehaviorSubject,
    fromEvent,
    merge,
    Observable,
    Subject,
    Subscription
} from "rxjs";
import { take } from "rxjs/operators";

import { Router, ActivatedRoute } from "@angular/router";

import { map } from "rxjs/operators";
import { DataSource } from "@angular/cdk/collections";
import { FuseUtils } from "@fuse/utils";
import { MatDialog, MatDialogRef } from "@angular/material";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { OrdersService } from "../service/orders.service";
import { TimeUtil } from "../../../model";

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
    dialogRef: any;

    dataSource: OrdersDataSource | null;

    displayedColumns = [
        "id",
        "name",
        "phone",
        "status",
        "createdAt",
        "deliveredAt",
        "pickupAt",
        "returnedAt",
        "total",
        "kegsDeliveredQty",
        "tapsDeliveredQty",
        "buttons"
    ];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    beginDate: string;
    endDate: string;
    status: number;

    sub: Subscription;

    // @ViewChild("filter")
    // filter: ElementRef;

    selectedUser: any;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        public _matDialog: MatDialog,
        private ordersService: OrdersService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this._unsubscribeAll = new Subject();
        this.setPastDays(7);
        this.refreshData();
    }

    ngOnInit(): void {
        this.dataSource = new OrdersDataSource(
            this.ordersService,
            this.paginator,
            this.sort
        );
    }

    refreshData() {
        this.sub = this.route.params.subscribe(params => {
            if (!params.beginDate || !params.endDate) {
                params = {
                    ...params,
                    beginDate: TimeUtil.chicagoDateStringWeekAgo,
                    endDate: TimeUtil.chicagoToday,
                    status: 0
                };
                this.beginDate = params.beginDate;
                this.endDate = params.endDate;
                this.navigateToParams(params);
            } else {
                this.beginDate = params.beginDate;
                this.endDate = params.endDate;
            }
        });
    }

    viewOrder(order) {
        this.router.navigate(["/orders/" + order.id]);
    }

    public setPastDays(days: number) {
        this.changeDateRange({
            beginDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * days)
                .toISOString()
                .slice(0, 10),
            endDate: new Date().toISOString().slice(0, 10),
            status: 9
        });
    }

    public changeDateRange(data: any) {
        this.navigateToParams(data);
    }

    private navigateToParams(data: any = {}) {
        this.route.params
            .pipe(take(1))
            .subscribe(params =>
                this.router.navigate(["/orders", { ...params, ...data }])
            );
    }
}

export class OrdersDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");
    // allUsers: User[];

    constructor(
        private ordersService: OrdersService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();
        this.filteredData = this.ordersService.orders;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.ordersService.onOrdersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this.ordersService.orders.slice();
                data = this.filterData(data);
                this.filteredData = [...data];
                data = this.sortData(data);
                const startIndex =
                    this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );
    }

    viewOrder() {}

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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
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
                case "id":
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case "name":
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case "phone":
                    [propertyA, propertyB] = [a.phone, b.phone];
                    break;
                case "status":
                    [propertyA, propertyB] = [a.status, b.status];
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
