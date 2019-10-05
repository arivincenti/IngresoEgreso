import { Action } from '@ngrx/store';
import { UserModel } from '../models/user.model';

export const SET_USER = '[Auth] Set User';

export class SetUserAction implements Action
{
  readonly type = SET_USER;

  constructor(public user: UserModel) { }
}

export type Actions = SetUserAction;