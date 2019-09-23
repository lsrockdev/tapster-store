import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TapsComponent } from "./com/taps.component";
import { RouterModule, Routes } from "@angular/router";
import {
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    MatTabsModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseSidebarModule } from "@fuse/components";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";

const routes: Routes = [
    {
        path: "",
        component: TapsComponent
        // resolve: {
        //     data: SizesService
        // }
    }
];

@NgModule({
    declarations: [TapsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatDialogModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule
    ]
})
export class TapsModule {}
