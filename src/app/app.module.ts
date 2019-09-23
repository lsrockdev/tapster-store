import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule, MatIconModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AppComponent } from "app/app.component";

import { AuthModule } from "app/main/auth/auth.module";
import { LayoutModule } from "app/layout/layout.module";
import { BackendService } from "./services/backend.service";
import { UserGuard } from "./guard/user.guard";
import { StoreModule } from "@ngrx/store";
import { appReducer } from "./store/app.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./store/app.effects";

const appRoutes: Routes = [
    {
        path: "orders",
        canActivate: [UserGuard],
        loadChildren: "app/main/orders/orders.module#OrdersModule"
    },
    {
        path: "**",
        redirectTo: "login"
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        MatMomentDateModule,
        MatButtonModule,
        MatIconModule,
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        LayoutModule,
        AuthModule,
        StoreModule.forRoot({ app: appReducer }),
        EffectsModule.forRoot([AppEffects])
    ],
    bootstrap: [AppComponent],
    providers: [BackendService, UserGuard]
})
export class AppModule {}
