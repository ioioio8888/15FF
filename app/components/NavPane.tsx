import React, { useState } from 'react';
import { NavPane, NavPaneItem, Text } from 'react-desktop/windows';
import Home from './Home';
import Counter from '../containers/CounterPage';

export default function Nav() {
  const [selected, setSelected] = useState('Home');

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
        return <Counter />;
      default:
        return <Home />;
    }
  }

  function renderItem(title: string) {
    return (
      <NavPaneItem
        title={title}
        icon={renderIcon(title)}
        theme="theme"
        background="#ffffff"
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
