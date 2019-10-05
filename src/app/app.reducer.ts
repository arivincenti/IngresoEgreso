import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAtuh from './auth/auth.reducer';

export interface AppState{
  ui: fromUi.UiState
  auth: fromAtuh.AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAtuh.authReducer
}