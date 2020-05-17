import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Nav from '../components/NavPane';
import { setAllyTeam, setEnemyTeam, setInGame } from '../actions/winrate';
import { stateType } from '../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    inGame: state.winrate.inGame,
    allyTeam: state.winrate.allyTeam,
    enemyTeam: state.winrate.enemyTeam
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setAllyTeam,
      setEnemyTeam,
      setInGame
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
