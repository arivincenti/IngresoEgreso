import * as fromUiActions from './ui.actions';

export interface UiState
{
  isLoading: boolean
}

const initState: UiState = {
  isLoading: false
}

export function uiReducer(state = initState, actions: fromUiActions.Actions): UiState
{
  switch (actions.type)
  {
    case fromUiActions.ACTIVAR_LOADING:
      return {
        isLoading: true
      }
    case fromUiActions.DESACTIVAR_LOADING:
      return {
        isLoading: false
      }
    default:
      return state;
  }
}