import React from 'react'
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f44336',
      },
      secondary: {
        main: '#3f51b5',
      },
    },
  });
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
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
  );
}

export default App;
