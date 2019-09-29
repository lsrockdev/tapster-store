import { Component, OnInit, ViewEncapsulation } from "@angular/core";
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

@Component({
    selector: "app-search-option",
    templateUrl: "./search-option.component.html",
    styleUrls: ["./search-option.component.scss"]
})
export class SearchOptionComponent implements OnInit {
    optionForm: FormGroup;

    OrderStatus = {
        New: 1,

        //Use for Store
        "Order is Ready": 2,
        "Schedule for Pick up": 3,

        // Use for Driver app
        "Claim Deliver": 4,
        "Claim PickUp": 5,
        Declaim: 6,
        Delivered: 7,
        "Deliver Failed": 8,
        Pickup: 9,
        "Pickup Failed": 10,
        Returned: 11
    };
    statues = [];

    constructor(
        private _formBuilder: FormBuilder // private profileService: ProfileService
    ) {
        this.statues = Object.keys(this.OrderStatus);
        this.optionForm = this.buildform();
        // const admin = Admin.getStoredAdmin();
        // this.profileForm.patchValue({
        //     id: admin.id,
        //     firstName: admin.firstName,
        //     lastName: admin.lastName,
        //     email: admin.email,
        //     phone: admin.phone
        // });
    }

    ngOnInit() {}

    submit() {
        console.log(this.optionForm.value);
    }

    clear() {}

    buildform() {
        return this._formBuilder.group({
            startDate: "",
            endDate: "",
            status: ""
        });
    }
}
