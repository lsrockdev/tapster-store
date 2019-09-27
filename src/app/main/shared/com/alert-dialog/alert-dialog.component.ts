import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: "app-alert-dialog",
    templateUrl: "./alert-dialog.component.html",
    styleUrls: ["./alert-dialog.component.scss"]
})
export class AlertDialogComponent implements OnInit {
    title = "";
    message = "";
    confirmButton = "";
    constructor(
        public matDialogRef: MatDialogRef<AlertDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any
    ) {
        this.title = _data && _data.title ? _data.title : "";
        this.message = _data && _data.message ? _data.message : "";
        this.confirmButton =
            _data && _data.confirmButton ? _data.confirmButton : "Ok";
    }

    ngOnInit(): void {}

    onCancelClick(): void {
        this.matDialogRef.close(["cancel"]);
    }

    onOkClick(): void {
        this.matDialogRef.close(["ok"]);
    }
}
