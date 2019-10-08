import { Action } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

//Acciones
export const SET_ITEMS = '[Ingreso-egreso] Set items';
export const UNSET_ITEMS = '[Ingreso-egreso] Unset items';

//Clases de acciones
export class SetItemsAction implements Action{
  readonly type = SET_ITEMS;

  constructor(public items: IngresoEgresoModel[]){}
}

export class UnsetItemsAction implements Action{
  readonly type = UNSET_ITEMS;
}

//Exportacion de las clases
export type Actions = SetItemsAction | UnsetItemsAction;