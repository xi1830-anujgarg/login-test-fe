import { createAction } from "@ngrx/store";

export const submit = createAction('submit');
export const loginSuccess = createAction('loginSuccess');
export const loginFailed = createAction('loginFailed');