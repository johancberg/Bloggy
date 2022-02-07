import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Redirect, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {

  /*
  Include later below Routes
  <Route path='/' exact element={() => <Redirect to="/posts" />} />
  */

  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <Navbar />
        <Routes>
          <Route path='/posts' exact element={<Home/>} />
          <Route path='/posts/search' exact element={<Home/>} />
          <Route path='/posts/:id' exact element={<PostDetails/>} />
          <Route path='/auth' exact element={<Auth/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
