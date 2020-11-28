import React, { useState } from 'react';
import './App.css';
import { Chat } from './components/chat/Chat';
import { Sidebar } from './components/sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    //<div className="app">
    <div className={`app ${!user && "appWithBackground"}`}>
      {!user ? <Login /> : (<div className="app__body">
        <Router>
          {/*<Sidebar />*/}
          <Switch>

            {/*<Route path={`${!deletedRoom ? "/rooms/:roomId" : "/rooms"}`}>*/}
            {/*<Route path={`${!deletedRoom ? "/rooms/:roomId" : "/rooms"}`}>
              <Chat />
            </Route>*/}
            <Route path="/rooms/:roomId">
              <Sidebar />
              <Chat />
            </Route>
            {/*<Route path={`/rooms/${deletedRoomId ? "" : ":roomId"}`}>
              <Chat />
            </Route>*/}
            {/*<Route path="/rooms/:roomId">
              {!deletedRoom
                ?
                <Chat />
                :
                <Redirect exact path="/" />
              }
            </Route>*/}

            <Route path="/">
              <Sidebar />
              <Chat />
            </Route>

          </Switch>
        </Router>
      </div>)}
    </div>
  );
}

export default App;
