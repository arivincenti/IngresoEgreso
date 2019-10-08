import * as fromIngresoEgresoActions from "./ingreso-egreso.actions";
import { IngresoEgresoModel } from "../models/ingreso-egreso.model";

export interface IngresoEgresoState {
  items: IngresoEgresoModel[];
}

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
