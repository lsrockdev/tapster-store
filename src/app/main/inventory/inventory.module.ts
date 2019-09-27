import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InventoryComponent } from "./com/inventory.component";
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
    MatAutocompleteModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseSidebarModule } from "@fuse/components";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";
import { InventoryService } from "./service/inventory.service";
import { AddInventoryComponent } from "./com/add-inventory/add-inventory.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    {
        path: "",
        component: InventoryComponent,
        resolve: {
            data: InventoryService
        }
    }
];

@NgModule({
    declarations: [InventoryComponent, AddInventoryComponent],
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
        MatAutocompleteModule,
        SharedModule
    ],
    entryComponents: [AddInventoryComponent],
    providers: [InventoryService]
})
export class InventoryModule {}
