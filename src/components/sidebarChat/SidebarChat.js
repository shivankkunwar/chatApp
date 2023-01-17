import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import './SidebarChat.css';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
function SidebarChat({id,name,addNewChat}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
    const { room } = useSelector((state)=> state.dataUp);
   
    useEffect(() => {
        if(id){
            setMessages(room.find(data=>data.id==id).data.messages);
        }
       
    }, [id,room]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, []);

  

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} key={id}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[messages.length-1]?.message}</p>
                </div>
            </div>
        </Link>
        
    ) : (
        <div className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    )
}


export default SidebarChat
