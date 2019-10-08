import { Action } from '@ngrx/store';
import { UserModel } from '../models/user.model';

export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] Unset User';

export class SetUserAction implements Action
{
  readonly type = SET_USER;

  constructor(public user: UserModel) { }
}

export class UnsetUserAction implements Action
{
  readonly type = UNSET_USER;
}

export type Actions = SetUserAction | UnsetUserAction;