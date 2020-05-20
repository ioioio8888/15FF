import React, { useState } from 'react';
import { NavPane, NavPaneItem } from 'react-desktop/windows';
import Home from './Home';
import WinRate from './Winrate';

export default function Nav(props: any) {

  const {
    setEnemyTeam,
    setAllyTeam,
    setInGame,
    setMainTab,
    setWinRate,
    enemyTeam,
    allyTeam,
    inGame,
    winRate,
    tab
  } = props;

  function renderIcon(title: string) {
    switch (title) {
      case 'Home':
        return <i className="fas fa-home" />;
      case 'Win Rate':
        return <i className="fas fa-flag" />;
      default:
        return <i className="fas fa-home" />;
    }
  }

  function renderContent(title: string) {
    switch (title) {
      case 'Home':
        return <Home />;
      case 'Win Rate':
        return (
          <WinRate
            setAllyTeam={setAllyTeam}
            setEnemyTeam={setEnemyTeam}
            setInGame={setInGame}
            setWinRate={setWinRate}
            enemyTeam={enemyTeam}
            winRate={winRate}
            allyTeam={allyTeam}
            inGame={inGame}
          />
        );
      default:
        return <Home />;
    }
  }

  function renderItem(title: string) {
    return (
      <NavPaneItem
        title={title}
        icon={renderIcon(title)}
        theme="dark"
        background="#232c39"
        selected={tab === title}
        onSelect={() => setMainTab(title)}
        padding="10px 20px"
        push
      >
        {renderContent(title)}
      </NavPaneItem>
    );
  }

  return (
    <NavPane openLength={200} push theme="dark">
      {renderItem('Home')}
      {renderItem('Win Rate')}
    </NavPane>
  );
}
