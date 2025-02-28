import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid2, Paper, AppBar, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../actions/posts';
//import ChipInput from 'material-ui-chip-input';

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
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState(''); 
  const [tags/*, setTags*/] = useState([]); 

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

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  }

  //const handleAdd = (tag) => setTags([...tags, tag]);
  //const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));  

  return (    
    <Grow in>
      <Container maxWidth="xl">
        <Grid2 container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid2 item size={{ xs:12, sm:6, md: 9}}>
            <Posts setCurrentId={setCurrentId} />
          </Grid2>
          <Grid2 item size={{ xs:12, sm:6, md: 3}}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField id="PostSearch" name="search" variant="outlined" label="Seach Posts" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} />
              {//*<ChipInput id="PostTags" style={{ margin: '10px 0'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" /> */
              }
              <Button style={{ margin: '10px 0 0 0'}} onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination} >
                <Paginate page={page} />
              </Paper>
            ))}
          </Grid2>
        </Grid2>
      </Container>
    </Grow>
  )
}

export default Home;