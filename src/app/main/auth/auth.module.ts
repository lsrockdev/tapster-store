import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./com/login/login.component";
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { AuthService } from "./service/auth.service";
import { SignupComponent } from "./com/signup/signup.component";

const routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: SignupComponent
    }
];

@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseSharedModule,
        CommonModule
    ],
    providers: [AuthService]
})
export class AuthModule {}
