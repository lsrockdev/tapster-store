import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
    ValidatorFn,
    AbstractControl,
    ValidationErrors
} from "@angular/forms";
import { StoresService } from "../../service/stores.service";
import { User, Stores } from "../../../../model";

@Component({
    selector: "app-update-store",
    templateUrl: "./update-store.component.html",
    styleUrls: ["./update-store.component.scss"]
})
export class UpdateStoreComponent implements OnInit {
    storeForm: FormGroup;
    @Input() store: Stores;

    constructor(
        private _formBuilder: FormBuilder,
        private storesService: StoresService
    ) {}

    ngOnInit() {
        console.log(this.store);
        this.storeForm = this.buildform();
    }

    submit() {
        const formData = this.storeForm.value;
        const address = {
            address1: formData.address1,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode
        };

        const data = {
            id: formData.id,
            address: address,
            description: formData.description,
            name: formData.name,
            numberOfDays: formData.numberOfDays
        };

        this.storesService.updateStore(data).then((res: any) => {});
    }

    buildform() {
        return this._formBuilder.group({
            id: this.store.id,
            name: [this.store.name, Validators.required],
            description: [this.store.description],
            address1: [this.store.address.address1, Validators.required],
            city: [this.store.address.city, Validators.required],
            state: [this.store.address.state],
            zipCode: [this.store.address.zipCode, Validators.required],
            numberOfDays: [this.store.numberOfDays]
        });
    }
}
