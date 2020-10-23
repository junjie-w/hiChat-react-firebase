import React, { useState } from 'react';
import './App.css';
import { Chat } from './components/chat/Chat';
import { Sidebar } from './components/sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? <Login /> : (<div className="app__body">
        <Router>
          <Sidebar />
          <Switch>

            <Route path="/rooms/:roomId">
              <Chat />
            </Route>

            <Route path="/">
              <Chat />
            </Route>

          </Switch>
        </Router>
      </div>)}
    </div>
  );
}

export default App;