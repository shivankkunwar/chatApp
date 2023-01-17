import React, {useState,useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector} from "react-redux";
import { updateData } from '../../Redux/data';
import { nanoid } from '@reduxjs/toolkit';
function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const { room } = useSelector((state)=> state.dataUp);
    const dispatch = useDispatch();


    useEffect(()=>{
        if(roomId){
            setRoomName(room.find(data=>data.id==roomId).data.name);
            setMessages(room.find(data=>data.id==roomId).data.messages);
        }
    },[roomId,room])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();

        dispatch(updateData({message:input,
                     name:"you",
                   timestamp:"",roomId,id:nanoid()}))
        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
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
                    <p key ={msg.id} className={`chat_message ${ msg.name == "you" && 'chat_receiver'}`}>
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
                    <button className="button-3" type="submit" onClick={sendMessage}> Send </button>
               
                <MicIcon/>
                </form>
            </div>
            
        </div>
    )
}

export default Chat
