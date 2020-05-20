import { GetState, Dispatch } from '../reducers/types';

export const SET_MAIN_TAB = 'SET_MAIN_TAB';

export function setMainTab(tab: number) {
  return {
    type: SET_MAIN_TAB,
    tab
  };
}
