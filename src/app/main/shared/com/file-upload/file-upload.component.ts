import {
    Component,
    OnInit,
    Input,
    NgZone,
    Output,
    EventEmitter
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    FileUploader,
    FileUploaderOptions,
    ParsedResponseHeaders
} from "ng2-file-upload";
import { Cloudinary } from "@cloudinary/angular-5.x";

@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.component.html",
    styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent implements OnInit {
    uploader: FileUploader;
    @Output() uploaded = new EventEmitter<string>();
    @Input() imageUrl: string = null;
    @Input() title: string = null;

    constructor(
        private cloudinary: Cloudinary,
        private zone: NgZone,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        // Create the file uploader, wire it to upload to your account
        const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/hdnhqtg3t/upload`,
            autoUpload: true,
            isHTML5: true,
            removeAfterUpload: true,
            headers: [
                {
                    name: "X-Requested-With",
                    value: "XMLHttpRequest"
                }
            ]
        };
        this.uploader = new FileUploader(uploaderOptions);
        this.uploader.onBuildItemForm = (
            fileItem: any,
            form: FormData
        ): any => {
            form.append("upload_preset", "xabzzliz");
            form.append("folder", "tapster_admin");
            form.append("file", fileItem);
            fileItem.withCredentials = false;
            return { fileItem, form };
        };

        this.uploader.onCompleteItem = (
            item: any,
            response: string,
            status: number,
            headers: ParsedResponseHeaders
        ) => {
            if (response) {
                const data = JSON.parse(response);
                this.imageUrl = data.url;
                this.uploaded.emit(data.url);
            }
        };
    }

    deleteImage = function(data: any, index: number) {
        const url = `https://api.cloudinary.com/v1_1/hdnhqtg3t/delete_by_token`;
        const headers = new Headers({
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        });
        const options = { headers: headers };
        const body = {
            token: data.delete_token
        };
        this.http.post(url, body, options).subscribe(response => {
            console.log(`Deleted image - ${data.public_id} ${response.result}`);
            this.responses.splice(index, 1);
        });
    };

    fileOverBase(e: any): void {
        console.log(e);
    }
}
