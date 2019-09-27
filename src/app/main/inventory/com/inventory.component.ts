import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from "rxjs";
import {
    debounceTime,
    distinctUntilChanged,
    map,
    takeUntil
} from "rxjs/operators";
import { DataSource } from "@angular/cdk/collections";
import { FuseUtils } from "@fuse/utils";
import { MatDialog, MatDialogRef } from "@angular/material";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { InventoryService } from "../service/inventory.service";
import { AddInventoryComponent } from "../com/add-inventory/add-inventory.component";
import { Inventory, Size } from "app/model";
import { AlertDialogComponent } from "../../shared/com/alert-dialog/alert-dialog.component";

@Component({
    selector: "app-inventory",
    templateUrl: "./inventory.component.html",
    styleUrls: ["./inventory.component.scss"]
})
export class InventoryComponent implements OnInit {
    dialogRef: any;

    dataSource: InventoryDataSource | null;

    displayedColumns = [
        "stock",
        "category",
        "size",
        "product",
        "keg",
        "Tap",
        "deliveryFee",
        "depositeFee",
        "price",
        "buttons"
    ];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild("filter")
    filter: ElementRef;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        public _matDialog: MatDialog,
        private inventoryService: InventoryService
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.dataSource = new InventoryDataSource(
            this.inventoryService,
            this.paginator,
            this.sort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    addInventory(): void {
        this.openAddInventoryDialog(null);
    }

    editInventory(inventory) {
        this.inventoryService
            .getCategorySizes(inventory.product.categoryId)
            .then(sizes => {
                this.openAddInventoryDialog(inventory, sizes);
            });
    }

    deleteInventory(inventory) {
        this.dialogRef = this._matDialog.open(AlertDialogComponent, {
            panelClass: "",
            data: {
                title: "Confirmation",
                message: "Are you sure you want to delete this inventory?"
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            switch (actionType) {
                case "ok":
                    this.delete(inventory.id);
                    break;
            }
        });
    }

    openAddInventoryDialog(inventory: Inventory, sizes: Size[] = null): void {
        this.inventoryService.getActiveProducts().then(products => {
            this.dialogRef = this._matDialog.open(AddInventoryComponent, {
                panelClass: "",
                data: {
                    inventory,
                    sizes,
                    products
                }
            });
            this.dialogRef.afterClosed().subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                if (actionType) {
                    this.refreshInventories();
                }
            });
        });
    }

    delete(id): void {
        this.inventoryService
            .deleteInventory(id)
            .then(res => this.refreshInventories());
    }

    refreshInventories() {
        this.inventoryService.getInventories().then(res => console.log(res));
    }
}

export class InventoryDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");
    // allUsers: User[];

    constructor(
        private inventoryService: InventoryService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();
        this.filteredData = this.inventoryService.inventories;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.inventoryService.onInventoriesChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this.inventoryService.inventories.slice();
                data = this.filterData(data);
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
                case "stock":
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case "category":
                    [propertyA, propertyB] = [a.category.name, b.category.name];
                    break;
                case "size":
                    [propertyA, propertyB] = [a.size.name, b.size.name];
                    break;
                case "product":
                    [propertyA, propertyB] = [a.product.name, b.product.name];
                    break;
                case "deliveryFee":
                    [propertyA, propertyB] = [
                        a.category.deliveryFee,
                        b.category.deliveryFee
                    ];
                    break;
                case "depositeFee":
                    [propertyA, propertyB] = [
                        a.product.depositeFee,
                        b.product.depositeFee
                    ];
                    break;
                case "price":
                    [propertyA, propertyB] = [a.price, b.price];
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
