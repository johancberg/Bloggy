import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, label, type, half, autoFocus, handleShowPassword }) => {
    return (
        
    <Grid item xs={6} sm={ half ? 6 : 12}>
        <TextField
            name={name}
            label={label}
            type={type}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            autoFocus={autoFocus}
            InputProps={name === 'password' ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              } : null}
            />
    </Grid>
    )
}

export default Input;