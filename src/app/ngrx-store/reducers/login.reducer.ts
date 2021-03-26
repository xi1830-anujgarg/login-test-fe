import { createReducer, on } from "@ngrx/store";
import { loginFailed, loginSuccess, submit } from "../actions/login.action";
import { initialState } from "../states/login.state";

const _loginReducer = createReducer(initialState, 
    on(submit, (state)=> {
        return {
            ...state,
            loading: true,
            login: false
        }
    }),on(loginSuccess, (state)=> {
        return {
            ...state,
            loading: false,
            login: true
        }
    }),on(loginFailed, (state)=> {
        return initialState
    })
);
export function loginReducer(state, action){
    return _loginReducer(state, action);
}