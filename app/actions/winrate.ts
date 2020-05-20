import { GetState, Dispatch } from '../reducers/types';

export const SET_ALLY_TEAM = 'SET_ALLY_TEAM';
export const SET_ENEMY_TEAM = 'SET_ENEMY_TEAM';
export const SET_IN_GAME = 'SET_IN_GAME';
export const SET_WIN_RATE = 'SET_WIN_RATE';

export function setEnemyTeam(Team: Array<any>) {
  return {
    type: SET_ENEMY_TEAM,
    members: Team
  };
}

export function setAllyTeam(Team: Array<any>) {
  return {
    type: SET_ALLY_TEAM,
    members: Team
  };
}

export function setWinRate(winRate: Array<any>) {
  return {
    type: SET_WIN_RATE,
    winRate
  };
}

export function setInGame(inGame: boolean) {
  return {
    type: SET_IN_GAME,
    inGame
  };
}
