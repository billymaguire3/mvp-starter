import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App.jsx';
import SitchChat from './components/SitchChat.jsx';

const createRoutes = () => (
  <BrowserRouter>
    <Route exact path="/home" component={App} />
    <Route exact path="/chat" component={SitchChat} />
  </BrowserRouter>
);

export default createRoutes;