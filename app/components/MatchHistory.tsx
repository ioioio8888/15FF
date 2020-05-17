import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import { ProgressCircle } from 'react-desktop/windows';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import routes from '../constants/routes.json';

export default function MatchHistory(props: any) {
  const { player } = props;
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [championData, setChampionData] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
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
        setGameHistory(data.games.games);
        return fetch(
          'http://ddragon.leagueoflegends.com/cdn/10.10.3208608/data/en_US/champion.json'
        );
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setChampionData(data);
        setLoading(false);
      })
      .catch(err => {});
    return () => {};
  }, []);

  function getChampionNameById(id: string) {
    const result = Object.entries(championData.data).filter((champion: any) => {
      return champion[1].key == id;
    });
    return result[0][0];
  }

  function renderHistory() {
    const sortedGameHistory = gameHistory.sort(
      (a, b) => b.gameCreation - a.gameCreation
    );
    return sortedGameHistory.map(game => {
      return (
        <div key={game.gameId}>
          <ListItem
            style={{
              backgroundColor: game.participants[0].stats.win
                ? '#001a00'
                : '#4d0000'
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <img
                  src={
                    'https://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/' +
                    getChampionNameById(game.participants[0].championId) +
                    '.png'
                  }
                  style={{ height: '100%', width: '100%' }}
                  alt="icon"
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              inset
              primary={
                game.participants[0].stats.kills +
                '/' +
                game.participants[0].stats.deaths +
                '/' +
                game.participants[0].stats.assists
              }
              secondary={
                <Typography component="span" variant="body2" color="white">
                  visionScore: {game.participants[0].stats.visionScore}
                </Typography>
              }
            ></ListItemText>
            <ListItemText style={{ textAlign: 'right' }}>
              {moment(game.gameCreation).format('DD-MM-YYYY')}
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      );
    });
  }

  function renderWinRate() {
    const result = gameHistory.filter(game => {
      return game.participants[0].stats.win;
    });
    return <ListItem>
      <ListItemText>
        {player+" has a win rate of "+ (result.length/20)*100 +"% from last 20 games! "}
      </ListItemText>
    </ListItem>
  }

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: '#232c39' }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push(routes.HOME);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {player}
          </Typography>
        </Toolbar>
      </AppBar>
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ color: 'white' }}
          >
            Match History
          </ListSubheader>
        }
      >
        {loading ? <ProgressCircle size={100} /> : renderWinRate()}
        {loading ? <></> : renderHistory()}
      </List>
    </>
  );
}
