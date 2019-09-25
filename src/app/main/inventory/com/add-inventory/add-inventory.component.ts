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
import { Inventory } from "app/model";

@Component({
    selector: "app-add-inventory",
    templateUrl: "./add-inventory.component.html",
    styleUrls: ["./add-inventory.component.scss"]
})
export class AddInventoryComponent implements OnInit {
    inventoryForm: FormGroup;
    isEdit = false;
    errorMessage: string;

    constructor(
        public matDialogRef: MatDialogRef<AddInventoryComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private inventoryService: InventoryService
    ) {
        this.isEdit = !!_data;
        this.inventoryForm = this.buildForm(_data);
    }

    ngOnInit(): void {
        this.inventoryForm.valueChanges.subscribe(
            value => (this.errorMessage = null)
        );
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
            size: ["", Validators.required]
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
        // if (this.isEdit) {
        //     this.sizeService
        //         .updateSize(this.sizeForm.value)
        //         .then(res => this.matDialogRef.close(["edit"]));
        // } else {
        //     this.sizeService
        //         .addSize(this.sizeForm.value)
        //         .then(res => this.matDialogRef.close(["add"]));
        // }
    }
}
