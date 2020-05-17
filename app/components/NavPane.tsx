import React, { useState } from 'react';
import { NavPane, NavPaneItem } from 'react-desktop/windows';
import Home from './Home';
import WinRate from './Winrate';

export default function Nav(props: any) {
  const [selected, setSelected] = useState('Home');
  const {
    setEnemyTeam,
    setAllyTeam,
    setInGame,
    enemyTeam,
    allyTeam,
    inGame
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
            enemyTeam={enemyTeam}
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
        selected={selected === title}
        onSelect={() => setSelected(title)}
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
