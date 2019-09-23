import { User } from "../model/user";
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
    User
} from "../model";

export enum AppFields {
    App = "app",
    User = "User"
}

export enum AppTypes {
    UpdateState = "update-app-state"
}

export interface AppState {
    [AppFields.User]: User;
}

export const InitialState: AppState = {
    [AppFields.User]: null
};

export interface UpdateState {
    type: AppTypes.UpdateState;
    payload: any;
}

export type ModuleAction = UpdateState;
