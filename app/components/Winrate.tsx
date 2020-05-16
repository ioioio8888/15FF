import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { ProgressCircle } from 'react-desktop/windows';
import { useHistory, Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function Winrate() {
  const [allyTeam, setAllyTeam] = useState([]);
  const [enemyTeam, setEnemyTeam] = useState([]);
  const [inGame, setInGame] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://127.0.0.1:2999/liveclientdata/allgamedata')
        .then(response => {
          setInGame(true);
          return response.json();
        })
        .then(data => {
          const summonerName = data.activePlayer.summonerName;
          const result = data.allPlayers.filter((player: any) => {
            return player.summonerName === summonerName;
          });
          const team = result[0].team;

          const ally = data.allPlayers.filter((player: any) => {
            return player.team === team;
          });
          setAllyTeam(ally);

          const enemy = data.allPlayers.filter((player: any) => {
            return player.team !== team;
          });
          setEnemyTeam(enemy);
          return true;
        })
        .catch(err => {
          setInGame(false);
          // console.log(err);
        });
    }, 5000);
    return () => clearInterval(interval);
  });

  function renderPlayerList(players: Array<object>) {
    return players.map((player: object) => {
      return (
        <ListItem
          button
          key={player.summonerName}
          onClick={() => {
            console.log(history);
            history.push(routes.COUNTER);
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <img
                src={
                  'https://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/' +
                  player.rawChampionName.substr(27) +
                  '.png'
                }
                style={{ height: '100%', width: '100%' }}
                alt="icon"
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={player.summonerName} />
        </ListItem>
      );
    });
  }

  if (!inGame) {
    return (
      <>
        <ProgressCircle size={100} />
        You are not in game or Champion select.
      </>
    );
  }

  return (
    <>
    <Link to={routes.MATCHHISTORY}>123123</Link>
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ color: 'white' }}
          >
            Your Team
          </ListSubheader>
        }
      >
        {renderPlayerList(allyTeam)}
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ color: 'white' }}
          >
            Enemy Team
          </ListSubheader>
        }
      >
        {renderPlayerList(enemyTeam)}
      </List>
    </>
  );
}
