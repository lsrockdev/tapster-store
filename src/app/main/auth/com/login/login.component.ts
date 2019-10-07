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
import { fuseAnimations } from "@fuse/animations";
import { AuthService } from "../../service/auth.service";
import { User } from "app/model";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
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
        this.loginForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    submit(e: Event): void {
        e.preventDefault();
        if (this.loginForm.valid) {
            this.loading = true;
            const data = this.loginForm.value;
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
                        (this.errorMessage = error.message)
                    )
                );
        }
    }

    private initUser(res: any): void {
        User.storeToken(res.token);

        User.storeUser(res.storeUser);
        this.router.navigate(["/orders"]);
    }
}
