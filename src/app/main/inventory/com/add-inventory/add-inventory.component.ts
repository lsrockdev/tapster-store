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
        this.sizes = _data.sizes;
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
    }

    displayFn(product?: Product): string | undefined {
        return product ? product.name : undefined;
    }

    selectedProduct(value) {
        this.inventoryService.getCategorySizes(value.categoryId).then(sizes => {
            this.sizes = sizes;
            if (this.sizes.length == 0) {
                this.errorMessage =
                    "Sorry! You can't choose this catergory because it don't have any size. Admin have to add sizes in this category.";
            } else {
                this.errorMessage = "";
            }
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
        if (inventory) {
            return this._formBuilder.group({
                id: [inventory.id],
                product: [inventory.product],
                size: [inventory.size.id],
                price: [inventory.price / 100],
                quantity: [inventory.quantity]
            });
        }
        return this._formBuilder.group({
            id: null,
            product: ["", Validators.required],
            size: ["", Validators.required],
            price: ["", Validators.required],
            quantity: [null, Validators.required]
        });
    }

    public submit(e: Event): void {
        const formValue = this.inventoryForm.value;
        const user = User.getStoredUser();
        const data = {
            id: formValue.id,
            productId: formValue.product.id,
            sizeId: formValue.size,
            price: formValue.price * 100,
            categoryId: formValue.product.categoryId,
            storeId: user.Store.id,
            quantity: formValue.quantity
        };
        if (this.isEdit) {
            this.inventoryService
                .updateInventory(data)
                .then(res => this.matDialogRef.close(["edit"]));
        } else {
            this.inventoryService.addInventory(data).then((res: any) => {
                if (!res.StatusCode) {
                    this.errorMessage = res.message;
                    return;
                }
                this.matDialogRef.close(["add"]);
            });
        }
    }
}
