import * as fromAuthActions from './auth.actions';
import { UserModel } from '../models/user.model';

export interface AuthState
{
  user: UserModel
}

const initState: AuthState = {
  user: null
}

export function authReducer(state = initState, action: fromAuthActions.Actions): AuthState
{
  switch (action.type)
  {
    case fromAuthActions.SET_USER:
      return {
        user: { ...action.user }
      };

    case fromAuthActions.UNSET_USER:
      return {
        user: null
      };

    default:
      return state;
  }
}