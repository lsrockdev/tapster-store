import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
    ValidatorFn,
    AbstractControl,
    ValidationErrors
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { InventoryService } from "../../service/inventory.service";
import { Inventory, Product, Size, Observable, User } from "app/model";
import { startWith, map } from "rxjs/operators";

@Component({
    selector: "app-add-inventory",
    templateUrl: "./add-inventory.component.html",
    styleUrls: ["./add-inventory.component.scss"]
})
export class AddInventoryComponent implements OnInit {
    inventoryForm: FormGroup;
    isEdit = false;
    errorMessage: string;
    products: Product[] = [];
    sizes: Size[] = [];

    filterProducts: Observable<Product[]>;

    constructor(
        public matDialogRef: MatDialogRef<AddInventoryComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private inventoryService: InventoryService
    ) {
        this.isEdit = !!_data.inventory;
        this.products = _data.products;
        this.inventoryForm = this.buildForm(_data.inventory);
    }

    ngOnInit(): void {
        this.inventoryForm.valueChanges.subscribe(value => {
            this.errorMessage = null;
        });

        this.filterProducts = this.inventoryForm
            .get("product")!
            .valueChanges.pipe(
                startWith(""),
                map(value => this._filterProduct(value))
            );

        // this.inventoryForm.get("product").valueChanges.subscribe(val => {
        //     console.log(val);
        //     // const product = val.product;
        //     this.inventoryService
        //         .getCategorySizes(val.categoryId)
        //         .then(sizes => {
        //             this.sizes = sizes;
        //             console.log(this.sizes);
        //         });
        // });
    }

    displayFn(product?: Product): string | undefined {
        return product ? product.name : undefined;
    }

    selectedProduct(value) {
        this.inventoryService.getCategorySizes(value.categoryId).then(sizes => {
            this.sizes = sizes;
        });
    }

    private _filterProduct(value: any): Product[] {
        if (value && !(value instanceof Product)) {
            return this.products.filter(product =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
        }
        return this.products;
    }

    /**
     * Create compose form
     *
     * @returns {FormGroup}
     */
    buildForm(inventory: Inventory): FormGroup {
        return this._formBuilder.group({
            id: null,
            product: ["", Validators.required],
            size: ["", Validators.required],
            price: ["", Validators.required]
        });
        // return !size
        //     ? this._formBuilder.group({
        //           id: null,
        //           name: ["", Validators.required],
        //           size: ["", Validators.required],
        //           description: ""
        //       })
        //     : this._formBuilder.group({
        //           id: [size.id],
        //           name: [size.name],
        //           size: [size.size],
        //           description: [size.description]
        //       });
    }

    public submit(e: Event): void {
        const formValue = this.inventoryForm.value;
        const user = User.getStoredUser();
        const data = {
            id: formValue.id,
            productId: formValue.product.id,
            sizeId: formValue.size,
            price: formValue.price,
            categoryId: formValue.product.categoryId,
            storeId: user.Store.id
        };
        console.log(data);
        if (this.isEdit) {
            this.inventoryService
                .updateInventory(data)
                .then(res => this.matDialogRef.close(["edit"]));
        } else {
            this.inventoryService
                .addInventory(data)
                .then(res => this.matDialogRef.close(["add"]));
        }
    }
}
