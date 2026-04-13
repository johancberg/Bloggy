import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container,} from '@mui/material';
//import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

//import { AUTH } from '../../constants/actionTypes'
import { signin, signup } from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';

const Auth = () => {
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

    const classes= useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup) {
            dispatch(signup(formData, navigate))
        } else { // Sign in
            dispatch(signin(formData, navigate))

        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prev) => !prev);
        setShowPassword(false);
    }

    /*
    const googleSuccess = async (response) => {
        console.log('response', response);
        const result = response?.profileObj; // Cannot get property profileObj of undefined
        const token = response?.tokenId;
        
        try {
            dispatch({ type: AUTH, data: { result, token }});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessfull. Try again later.")
    }
    */

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} spacing={3} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half></Input>
                                </>
                            )}
                            <Input name="email" label="E-mail Address" handleChange={handleChange} type="email"></Input>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}></Input>
                            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type="submit" sx={{ mt: 2, mb: 1 }} fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    {/* <GoogleLogin
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                    />*/
                    }

                    <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign In!' : 'Dont have an account? Sign Up!'}
                        </Button>
                    </Grid>
                 </form>
            </Paper>
        </Container>
    )
}

export default Auth;