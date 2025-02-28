import React from 'react';
import { TextField, Grid2, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Input = ({ name, handleChange, label, type, half, autoFocus, handleShowPassword }) => {
    return (
        
    <Grid2 item size={{ xs:6, sm:half ? 6 : 12 }}>
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
    </Grid2>
    )
}

export default Input;