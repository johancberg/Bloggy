import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { LOGOUT } from '../../constants/actionTypes';
import useStyles from './styles';
import memories from '../../images/memories.png';


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const logout = useCallback(() => {
    dispatch({ type: LOGOUT});
    navigate('/');
    setUser(null);
  }, [dispatch, navigate])

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) { logout() };
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, logout, location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center">Bloggy</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </Link>
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