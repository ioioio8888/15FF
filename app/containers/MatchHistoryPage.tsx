import React from 'react';
import MatchHistory from '../components/MatchHistory';

export default function MatchHistoryPage(props: any) {
  return <MatchHistory player={props.location.state.player}/>;
}
