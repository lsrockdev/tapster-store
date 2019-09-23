import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule
} from "@angular/forms";
import { Subject, of } from "rxjs";
import { Router } from "@angular/router";
import { FuseConfigService } from "@fuse/services/config.service";
import { AuthService } from "../../service/auth.service";
import { User } from "app/model";

@Component({
    selector: "register",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    // Private
    private _unsubscribeAll: Subject<any>;

    errorMessage: string;
    loading: boolean;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private _fuseConfigService: FuseConfigService,
        private authService: AuthService
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this._unsubscribeAll = new Subject();
        this.registerForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            confirmPassword: ["", Validators.required],
            name: ["", Validators.required],
            code: ["", Validators.required],
            address: ["", Validators.required],
            phone: ["", Validators.required],
            city: ["", Validators.required],
            zipCode: ["", Validators.required]
        });
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    submit(e: Event): void {
        e.preventDefault();
        if (this.registerForm.valid) {
            this.loading = true;
            const data = this.registerForm.value;
            this.authService
                .login(data.email, data.password)
                .then(
                    res => (
                        (this.loading = false),
                        res ? this.initUser(res) : of(null)
                    )
                )
                .catch(
                    error => (
                        console.log(error),
                        (this.loading = false),
                        (this.errorMessage = error)
                    )
                );
        }
    }

    private initUser(res: any): void {
        User.storeToken(res.token);
        User.storeUser(res.user);
        this.router.navigate(["/orders"]);
    }
}
