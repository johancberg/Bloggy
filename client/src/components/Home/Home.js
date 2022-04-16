import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPosts } from '../../actions/posts';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination';

import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch =  useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const serach = query.get('searchQuery');

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);


  return (    
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar ckassName={classes.appBarSearch} position="static" color="inherit">
              <TextField name="search" variant="outlined" label="Seach Memories" fullWidth value="TEST" onChange={() => {}} />
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6} >
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;