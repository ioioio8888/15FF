import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Nav from '../components/NavPane';
import { setAllyTeam, setEnemyTeam, setInGame, setWinRate } from '../actions/winrate';
import { setMainTab } from '../actions/mainTab';
import { stateType } from '../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    inGame: state.winrate.inGame,
    allyTeam: state.winrate.allyTeam,
    enemyTeam: state.winrate.enemyTeam,
    winRate: state.winrate.winRate,
    tab: state.mainTab.tab
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setAllyTeam,
      setEnemyTeam,
      setInGame,
      setMainTab,
      setWinRate
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
