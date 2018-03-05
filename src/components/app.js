import React from 'react';
import Chat from './chat';
import Lobby from './lobby';
import 'materialize-css/dist/css/materialize.min.css';


const App = () => (
    <div>
        <div className="container">
            <h1 className="center-align">Fireside 🔥 Chat</h1>
            <Lobby />
        </div>
    </div>
);

export default App;
