import React from "react";
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';


const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    if (!posts.length && !isLoading) return 'No posts';

    return (
    <Typography>
        Notice!
        This app i currently deprecated because the server-side is executed through Heroku, which does not work with a free tier any longer. The server-side rendering is planned to be moved,
        and the source code can be found <a href="https://github.com/johancberg/Bloggy">here</a>.
    </Typography>
    )
    /*
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
    */
}

export default Posts;