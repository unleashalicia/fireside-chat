import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {db} from '../firebase';
import {getRoomList, createRoom} from '../actions';


class Lobby extends Component {
    constructor(props){
        super(props);

        this.state = {
            roomName: ''
        };

        this.dbChatRef = db.ref('/chat-rooms');
    }

    componentDidMount(){
        this.dbChatRef.on('value', snapshot => {
           this.props.getRoomList(snapshot.val());
        });
    }

    componentWillUnmount(){
        this.dbChatRef.off();
    }

    handleCreateRoom(e){
        e.preventDefault();

        this.props.createRoom(this.state.roomName);

        this.setState({
           roomName: ''
        });
    }

    render(){
        const {roomName} = this.state;
        const {roomList} = this.props;
        let rooms = [];

        if (roomList) {
            rooms = Object.keys(this.props.roomList).map((key, index) => {
                return (
                    <li className="collection-item brown" key={index}>
                        <Link className="white-text" to={`/room/${key}/log/${roomList[key].chatLogId}`}>{roomList[key].name}</Link>
                    </li>
                );
            });
        } else {
            rooms.push(<li className="collection-item brown" key="0">No rooms available.  Create one above</li>)
        }

        return (
          <div>
              <h3>Chat Lobby</h3>
              <form onSubmit={this.handleCreateRoom.bind(this)}>
                  <label>Chat Room Name</label>
                  <input type="text" onChange={e => {this.setState({roomName: e.target.value})}} value={roomName}/>
                  <button className="btn orange accent-3">Create Room</button>
              </form>
              <ul className="collection">{rooms}</ul>
          </div>
        );
    }
}

function mstp(state){
    return {
        roomList: state.chat.roomList
    }
}

export default connect(mstp, {getRoomList, createRoom})(Lobby);