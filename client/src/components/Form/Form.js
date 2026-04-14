import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AttachFileIcon from '@mui/icons-material/AttachFile';

import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts";

// GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
    const  [postData, setPostData] = useState ({
        title: '', message: '', tags: '', selectedFile: '', fileName: '',
    })
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
        } else if (!postData.title || !postData.selectedFile) {
            alert('Fill in Creator, Title and File');
            return;
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name}, navigate));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({title: '', message: '', tags: '', selectedFile: '', fileName: ''});
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPostData({ ...postData, selectedFile: reader.result, fileName: file.name });
        };
        console.log('file', postData);
        reader.readAsDataURL(file);
    }
    
    if (!user?.result.name) {
        if (user && !user?.result?.name) {
            return (
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">
                        An unexpected error occurred. Please sign out and in again.
                    </Typography>
                </Paper>
            )
        }

        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to post and like others' posts.
                </Typography>
            </Paper>
        )
    }
    
    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a Post</Typography>
                <TextField name ="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name ="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name ="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(`,`) })} />
                <div className={classes.buttons}>
                    <div className={classes.fileInput}>
                        <Button
                            className={classes.squareButton}
                            variant="contained"
                            component="label"
                            size="small"
                            aria-label="Upload file"
                        >
                            <AttachFileIcon  />
                            <input
                                id="file-input"
                                accept="image/*"
                                type="file"
                                onChange={handleFileChange}
                                hidden
                                lang="en"
                            />
                        </Button>

                        <Typography variant="body2">
                            {postData.selectedFile ? postData.fileName : "No file chosen"}
                        </Typography>
                    </div>

                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </div>
            </form>
        </Paper>
    )
}

export default Form;