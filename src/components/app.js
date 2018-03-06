import React from 'react';
import {Route} from 'react-router-dom';

import ChatRoom from './chat_room';
import Lobby from './lobby';
import 'materialize-css/dist/css/materialize.min.css';


const App = () => (
    <div>
        <div className="container">
            <h1 className="center-align">Fireside 🔥 Chat</h1>
            <Route exact path="/" component={Lobby} />
            <Route path="/room/:roomId/log/:logId" component={ChatRoom} />
        </div>
    </div>
);

export default App;
