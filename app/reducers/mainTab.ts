import { Action } from 'redux';
import { SET_MAIN_TAB } from '../actions/mainTab';

const initialState = {
  tab: 'Home'
};

export default function counter(state = initialState, action: Action<any>) {
  switch (action.type) {
    case SET_MAIN_TAB:
      return {
        ...state,
        tab: action.tab
      };
    default:
      return state;
  }
}
