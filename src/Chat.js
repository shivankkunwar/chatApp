import React, {useState,useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { useParams } from 'react-router-dom';

import rooms from "./data/rooms";
function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
   

    useEffect(()=>{
        if(roomId){
            setRoomName(rooms.find(data=>data.id==roomId).data.name);
            setMessages(rooms.find(data=>data.id==roomId).data.messages);
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        setMessages(
            messages.concat({
                message:input,
                name:"you",
                timestamp:""
            }) );
        

        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat_headerInfo'>
                    <h3 className='chat-room-name'>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                       
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                    
                </div>
            </div>
            <div className='chat_body'>
                {messages.map(msg => (
                    <p className={`chat_message ${ msg.name == "you" && 'chat_receiver'}`}>
                        <span className="chat_name">{msg.name}</span>
                        {msg.message}
                        <span className="chat_timestemp">
                            
                        </span>
                    </p>
                ))}
            </div>
            <div className='chat_footer'>
                <form>
                <InsertEmoticonIcon />
                        
                    <input value={input} onChange={(e) => setInput(
                        e.target.value
                        )} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send </button>
               
                <MicIcon/>
                </form>
            </div>
            
        </div>
    )
}

export default Chat
