import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertDialogComponent } from "./com/alert-dialog/alert-dialog.component";

import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseSidebarModule } from "@fuse/components";
import { FileUploadComponent } from "./com/file-upload/file-upload.component";
import { FileUploadModule } from "ng2-file-upload";
import { Cloudinary } from "cloudinary-core";
import {
    CloudinaryModule,
    CloudinaryConfiguration,
    provideCloudinary
} from "@cloudinary/angular-5.x";

export const cloudinaryLib = {
    Cloudinary: Cloudinary
};

@NgModule({
    declarations: [AlertDialogComponent, FileUploadComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FileUploadModule,
        CloudinaryModule.forRoot(cloudinaryLib, {
            cloud_name: "hdnhqtg3t",
            api_key: "488178166344465",
            api_secret: "AM1DU897wa6SpqZlehcrQoYXVak"
        })
    ],
    exports: [FileUploadComponent],
    entryComponents: [AlertDialogComponent]
})
export class SharedModule {}
