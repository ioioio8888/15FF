import { Action } from 'redux';
import { SET_ALLY_TEAM, SET_ENEMY_TEAM, SET_IN_GAME } from '../actions/winrate';

const initialState = {
  allyTeam: [],
  enemyTeam: [],
  inGame: false
};

export default function counter(state = initialState, action: Action<any>) {
  switch (action.type) {
    case SET_ENEMY_TEAM:
      return {
        ...state,
        enemyTeam: action.members
      };
    case SET_ALLY_TEAM:
      return {
        ...state,
        allyTeam: action.members
      };
    case SET_IN_GAME:
      return {
        ...state,
        inGame: action.inGame
      };
    default:
      return state;
  }
}
