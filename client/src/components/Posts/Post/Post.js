import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import { ThumbUpAlt, ThumbUpOffAlt, Delete, MoreHoriz } from '@mui/icons-material';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'))
    
    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpOffAlt fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media}
                image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                
                { (user?.result?.googleId === post?.creator || user?.results?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHoriz fontSize="medium" />
                    </Button>
                </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <CardContent>
                    <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                    <Typography className={classes.message} variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                { (user?.result?.googleId === post?.creator || user?.results?._id === post?.creator) && (
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <Delete fontSize="small"/>
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post;