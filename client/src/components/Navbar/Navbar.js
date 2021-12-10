import React, { useState, useEffect } from 'react';
import { Avatar, AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import memories from '../../images/memories.png';


const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const logout = () => {
    dispatch({ type: 'LOGOUT'});
    navigate('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    // Insert JWT...

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Bloggy</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        { user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.lougout} color="secondary" onClick={logout}>Sign out</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;