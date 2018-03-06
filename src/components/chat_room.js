import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRoomData, getChatLog, sendNewMessage} from "../actions";
import {db} from '../firebase';

class ChatRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: ''
        };
    }

    componentDidMount(){

        const {roomId, logId} = this.props.match.params;

        this.props.getRoomData(roomId, logId);
    }

    componentWillReceiveProps(nextProps){
        if (!this.props.roomInfo.chatLogId && nextProps.roomInfo.chatLogId){
            console.log("We now have chat log ID");

            db.ref(`/chat-logs/${nextProps.roomInfo.chatLogId}`).on('value', snapshot => {
                this.props.getChatLog(snapshot.val());
            });
        }
    }

    sendMessage(e){
        e.preventDefault();
        console.log("Sending Message");

        this.props.sendNewMessage(this.props.roomInfo.chatLogId, this.state.message);

        this.setState({
            message: ''
        });
    }

    render(){

        const {chatLog} = this.props;

        const msgs = Object.keys(chatLog).reverse().map((key) => {
           return <li key={key} className="collection-item">{chatLog[key]}</li>
        });

        const {name} = this.props.roomInfo;

        return (
            <div>
                <h3>{name ? name : 'Loading Room...'}</h3>
                <form onSubmit={this.sendMessage.bind(this)}>
                    <label>Enter Message</label>
                    <input type="text" value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
                    <button className="btn orange accent-3">Submit</button>
                </form>
                <ul className="collection">{msgs}</ul>
            </div>
        )
    }
}

function mstp(state){
    return {
        roomInfo: state.chat.currentRoom,
        chatLog: state.chat.chatLog
    }
}


export default connect(mstp, {getRoomData, getChatLog, sendNewMessage})(ChatRoom);