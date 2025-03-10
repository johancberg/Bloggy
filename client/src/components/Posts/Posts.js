import React from "react";
import { Grid2, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';


const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    if (!posts.length && !isLoading) return 'No posts';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid2 className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid2 key={post._id} item size={{ xs:12, sm:12, md:6, lg:3 }}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid2>
                ))}
            </Grid2>
        )
    )
}

export default Posts;