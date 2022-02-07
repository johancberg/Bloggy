import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  /*
  TODO: CHECK IF NEEDED TO USE REACT-ROUTER-DOM v5 INSTEAD OF v6
  */

  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <Navbar />
        <Routes>
          <Route path='/' exact element={() => <Navigate to="/posts" />} />
          <Route path='/posts' exact element={<Home/>} />
          <Route path='/posts/search' exact element={<Home/>} />
          <Route path='/posts/:id' exact element={<PostDetails/>} />
          <Route path='/auth' exact element={() => (!user ? <Auth/> : <Navigate to="/posts" />)} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
