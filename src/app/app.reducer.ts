import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAtuh from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState{
  ui: fromUi.UiState
  auth: fromAtuh.AuthState
  ingresoEgreso: fromIngresoEgreso.IngresoEgresoState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAtuh.authReducer,
  ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
}