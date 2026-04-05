import React from 'react'
import { Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
//import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f44336',
      },
    },
  });
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    //<GoogleOAuthProvider clientId="875273323126-6hpj1a1hnki3j91mi9o75navvjkpo6ok.apps.googleusercontent.com">
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxwidth="xl">
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Navigate to="/posts" />} />
            <Route path='/posts' exact element={<Home/>} />
            <Route path='/posts/search' exact element={<Home/>} />
            <Route path='/posts/:id' exact element={<PostDetails/>} />
            <Route path='/auth' exact element={!user ? <Auth/> : <Navigate to="/posts" />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
    //</GoogleOAuthProvider>
  );
}

export default App;
