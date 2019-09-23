import { FormControl } from "@angular/forms";

export class CustomValidators {
    public static notEqual(val: string | number) {
        return (c: FormControl) =>
            c.value == val ? { NotEqual: "equal" } : null;
    }

    public static equal(val: string | number) {
        return (c: FormControl) =>
            c.value == val ? null : { Equal: "not equal" };
    }

    public static equalTo(t: FormControl) {
        return (c: FormControl) =>
            t.value == c.value ? null : { EqualTo: "not equal" };
    }
}
