import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { ProgressCircle } from 'react-desktop/windows';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import routes from '../constants/routes.json';

export default function Winrate(props: any) {
  const {
    setEnemyTeam,
    setAllyTeam,
    setInGame,
    setWinRate,
    enemyTeam,
    winRate,
    allyTeam,
    inGame
  } = props;

  interface AIpredictRequest {
    //order
    100: {
      turrets: 0;
      herald: 0;
      baron: 0;
      dragon: 0;
      inhibitors: 0;
      level: 0;
      kills: 0;
      deaths: 0;
      assists: 0;
      cs: 0;
    };
    //chaos
    200: {
      turrets: 0;
      herald: 0;
      baron: 0;
      dragon: 0;
      inhibitors: 0;
      level: 0;
      kills: 0;
      deaths: 0;
      assists: 0;
      cs: 0;
    };
  }

  // const [winRate, setWinRate] = useState([]);
  const history = useHistory();

  function findPlayerTeam(players: Array<any>, playerName: string) {
    const player = players.filter((player: any) => {
      return player.summonerName === playerName;
    });
    return player[0].team;
  }

  function calculateWinRate(games: Array<any>) {
    const result = games.filter(game => {
      return game.participants[0].stats.win;
    });
    return parseInt((result.length / games.length) * 100);
  }

  function fetchPlayers() {
    fetch('https://127.0.0.1:2999/liveclientdata/allgamedata')
      .then(response => {
        setInGame(true);
        return response.json();
      })
      .then(data => {
        //get the data for UI
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

        constructRequest(data);
        return true;
      })
      .catch(err => {
        console.log(err);
        setInGame(false);
        setAllyTeam([]);
        setEnemyTeam([]);
        setWinRate([]);
      });
  }

  function constructRequest(data: any) {
    let request: AIpredictRequest = {
      // order
      '100': {
        turrets: 0,
        herald: 0,
        baron: 0,
        dragon: 0,
        inhibitors: 0,
        level: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        cs: 0
      },
      // chaos
      '200': {
        turrets: 0,
        herald: 0,
        baron: 0,
        dragon: 0,
        inhibitors: 0,
        level: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        cs: 0
      }
    };
    // construct the request for ai prediction
    data.allPlayers.forEach((player: any) => {
      if (player.team === 'ORDER') {
        request[100].cs += player.scores.creepScore;
        request[100].kills += player.scores.kills;
        request[100].deaths += player.scores.deaths;
        request[100].assists += player.scores.assists;
        request[100].level += player.level;
      } else {
        request[200].cs += player.scores.creepScore;
        request[200].kills += player.scores.kills;
        request[200].deaths += player.scores.deaths;
        request[200].assists += player.scores.assists;
        request[200].level += player.level;
      }
    });
    data.events.Events.forEach((event: any) => {
      switch (event.EventName) {
        case 'TurretKilled':
          if (event.TurretKilled.includes('Turret_T2')) {
            request[100].turrets += 1;
          } else {
            request[200].turrets += 1;
          }
          break;
        case 'InhibKilled':
          if (event.TurretKilled.includes('Barracks_T2')) {
            request[100].inhibitors += 1;
          } else {
            request[200].inhibitors += 1;
          }
          break;
        case 'DragonKill':
          if (findPlayerTeam(data.allPlayers, event.KillerName) === 'ORDER') {
            request[100].dragon += 1;
          } else {
            request[200].dragon += 1;
          }
          break;
        case 'BaronKill':
          if (findPlayerTeam(data.allPlayers, event.KillerName) === 'ORDER') {
            request[100].baron += 1;
          } else {
            request[200].baron += 1;
          }
          break;
        case 'HeraldKill':
          if (findPlayerTeam(data.allPlayers, event.KillerName) === 'ORDER') {
            request[100].herald += 1;
          } else {
            request[200].herald += 1;
          }
          break;
        default:
          break;
      }
    });
    console.log(request);
  }

  function fetchWinRate(player: string) {
    fetch(
      'https://acs-garena.leagueoflegends.com/v1/players?name=' +
        player +
        '&region=TW'
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        return fetch(
          'https://acs-garena.leagueoflegends.com/v1/stats/player_history/TW/' +
            data.accountId +
            '?begIndex=0&endIndex=20&'
        );
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newWinRate = winRate;
        newWinRate[player] = calculateWinRate(data.games.games);
        setWinRate(newWinRate);
        return true;
      })
      .catch(err => {
        console.log(err);
        const newWinRate = winRate;
        newWinRate[player] = "-";
        setWinRate(newWinRate);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPlayers();
    }, 5000);
    fetchPlayers();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    enemyTeam.forEach(player => {
      if (winRate[player.summonerName] === undefined) {
        fetchWinRate(player.summonerName);
      }
    });
    allyTeam.forEach(player => {
      if (winRate[player.summonerName] === undefined) {
        fetchWinRate(player.summonerName);
      }
    });
    return () => {};
  }, [enemyTeam, allyTeam]);

  function renderPlayerList(players: Array<object>) {
    return players.map((player: object) => {
      return (
        <ListItem
          button
          key={player.summonerName}
          onClick={() => {
            history.push({
              pathname: routes.MATCHHISTORY,
              search: '',
              state: { player: player.summonerName }
            });
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={1}>
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
            </Grid>
            <Grid item xs={3}>
              <ListItemText
                style={{ textAlign: 'left' }}
                primary={player.summonerName}
              />
            </Grid>
            <Grid item xs={3}>
              <ListItemText
                style={{ textAlign: 'right' }}
                primary={
                  winRate[player.summonerName] == undefined
                    ? '-'
                    : winRate[player.summonerName] + '%'
                }
              />
            </Grid>
            <Grid item xs={3}>
              <ListItemText
                inset
                style={{ textAlign: 'right' }}
                primary={
                  player.scores.kills +
                  '/' +
                  player.scores.deaths +
                  '/' +
                  player.scores.assists
                }
                secondary={
                  <Typography component="span" variant="body2" color="inherit">
                    wardScore: {Math.round(player.scores.wardScore)}
                  </Typography>
                }
              ></ListItemText>
            </Grid>
          </Grid>
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
      <List component="nav">
        <ListSubheader style={{ color: 'white' }}>Your Team</ListSubheader>
        {renderPlayerList(allyTeam)}
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader style={{ color: 'white' }}>Enemy Team</ListSubheader>
        }
      >
        {renderPlayerList(enemyTeam)}
      </List>
    </>
  );
}
