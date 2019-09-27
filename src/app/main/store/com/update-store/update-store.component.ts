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
// import { ProfileService } from "../../service/profile.service";
import { User } from "../../../../model";

@Component({
    selector: "app-update-store",
    templateUrl: "./update-store.component.html",
    styleUrls: ["./update-store.component.scss"]
})
export class UpdateStoreComponent implements OnInit {
    storeForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder
    ) // private profileService: ProfileService
    {
        this.storeForm = this.buildform();
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
        // const data = this.storeForm.value;
        // this.profileService.updateProfile(data).then((res: any) => {
        //     Admin.storeAdmin(res.user);
        // });
    }

    buildform() {
        return this._formBuilder.group({
            id: null,
            name: [null, Validators.required],
            description: [null],
            address: [null, Validators.required],
            city: [null, Validators.required],
            state: [null, Validators.required],
            zipCode: [null, Validators.required],
            numberOfDays: [null, Validators.required]
        });
    }
}
