import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
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

const routes = [
    {
        path: "login",
        component: LoginComponent
    }
];

@NgModule({
    declarations: [LoginComponent],
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
