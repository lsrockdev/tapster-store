import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersComponent } from "./com/orders.component";
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
    MatTabsModule,
    MatDatepickerModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseSidebarModule } from "@fuse/components";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";
import { OrdersService } from "./service/orders.service";
import { SearchOptionComponent } from './com/search-option/search-option.component';

const routes: Routes = [
    {
        path: "",
        component: OrdersComponent,
        resolve: {
            data: OrdersService
        }
    }
];

@NgModule({
    declarations: [OrdersComponent, SearchOptionComponent],
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
        FuseWidgetModule,
        MatDatepickerModule
    ],
    providers: [OrdersService]
})
export class OrdersModule {}
