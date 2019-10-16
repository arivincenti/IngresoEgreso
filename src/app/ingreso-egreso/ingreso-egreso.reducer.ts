import * as fromIngresoEgresoActions from "./ingreso-egreso.actions";
import { IngresoEgresoModel } from "../models/ingreso-egreso.model";
import { AppState } from '../app.reducer';

interface IngresoEgresoState {
  items: IngresoEgresoModel[];
}

export interface AppState extends AppState {
  ingresoEgreso: IngresoEgresoState
};

const initState: IngresoEgresoState = {
  items: []
};

export function ingresoEgresoReducer(
  state = initState,
  action: fromIngresoEgresoActions.Actions
): IngresoEgresoState {
  switch (action.type) {
    case fromIngresoEgresoActions.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => {
            return {
              ...item
            };
          })
        ]
      };

    case fromIngresoEgresoActions.UNSET_ITEMS:
      return {
        items: []
      };

    default:
      return state;
  }
}
