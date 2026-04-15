import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../actions/posts';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import SearchBar from '../Form/SearchForm';
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
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState(''); 
  const [tags, setTags] = useState([]); 

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim() || tags ) {
      dispatch(getPostsBySearch({search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none' }&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  }

  return (    
    <Grow in>
      <Container style={{ paddingBottom: "48px" }} maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid size={{ xs:12, sm:6, md: 9}}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid size={{ xs:12, sm:6, md: 3}}>
            <SearchBar search={search} setSearch={setSearch} tags={tags} setTags={setTags} searchPost={searchPost} />
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination} >
                <Paginate page={page} />
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;