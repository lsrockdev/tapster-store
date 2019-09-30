import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import * as _moment from "moment";
const moment = _moment;

@Component({
    selector: "app-search-option",
    templateUrl: "./search-option.component.html",
    styleUrls: ["./search-option.component.scss"]
})
export class SearchOptionComponent implements OnInit {
    optionForm: FormGroup;
    @Input() beginDate = null;
    @Input() endDate = null;

    @Output() event = new EventEmitter<any>();

    statues = [
        { key: "All", value: 0 },
        { key: "New", value: 1 },
        { key: "Order is Ready", value: 2 },
        { key: "Schedule for Pick up", value: 3 },
        { key: "Claim Deliver", value: 4 },
        { key: "Claim PickUp", value: 5 },
        { key: "Declaim", value: 6 },
        { key: "Delivered", value: 7 },
        { key: "Deliver Failed", value: 8 },
        { key: "Pickup", value: 9 },
        { key: "Pickup Failed", value: 10 },
        { key: "Returned", value: 11 }
    ];

    constructor(
        private _formBuilder: FormBuilder // private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.optionForm = this.buildform();
    }

    submit() {
        const data = this.optionForm.value;
        this.event.emit({
            data: {
                beginDate: data.beginDate.format("YYYY-MM-DD"),
                endDate: data.endDate.format("YYYY-MM-DD"),
                status: data.status
            }
        });
    }

    clear() {}

    buildform() {
        return this._formBuilder.group({
            beginDate: moment(this.beginDate),
            endDate: moment(this.endDate),
            status: this.statues[0].value
        });
    }
}
