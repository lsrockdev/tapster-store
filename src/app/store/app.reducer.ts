import { ModuleAction, AppTypes, AppState, InitialState } from './app.models';

export function appReducer(s: AppState = InitialState, a: ModuleAction): AppState {
    if (!a) { return s; }
    switch (a.type) {
        case AppTypes.UpdateState: 
            return { ...s, ...a.payload };
        default: return s;
    }
}
