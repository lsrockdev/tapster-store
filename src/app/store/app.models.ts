import { Admin } from "../model/admin";
export {
    throwError,
    Observable,
    switchMap,
    map,
    Action,
    Store,
    take,
    combineLatest,
    catchError,
    finalize,
    Admin
} from "../model";

export enum AppFields {
    App = "app",
    Admin = "User"
}

export enum AppTypes {
    UpdateState = "update-app-state"
}

export interface AppState {
    [AppFields.Admin]: Admin;
}

export const InitialState: AppState = {
    [AppFields.Admin]: null
};

export interface UpdateState {
    type: AppTypes.UpdateState;
    payload: any;
}

export type ModuleAction = UpdateState;
