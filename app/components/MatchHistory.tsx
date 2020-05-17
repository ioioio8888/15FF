import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ProgressCircle } from 'react-desktop/windows';
import { useHistory } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function MatchHistory(props: any) {
  const { player } = props;
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  function renderHistory(){

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
            MatchHistory
          </Typography>
        </Toolbar>
      </AppBar>
      {loading ? <ProgressCircle size={100} /> : renderHistory()}
    </>
  );
}
