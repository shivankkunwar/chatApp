import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import './SidebarChat.css';
import {Link} from 'react-router-dom';
import rooms from "./data/rooms"
function SidebarChat({id,name,addNewChat}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
   
    useEffect(() => {
        if(id){
            setMessages(rooms.find(data=>data.id==id).data.messages);
        }
       
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, []);

    const createChat = () => {
        const roomName = prompt("Please Enter Name for Chat");
        console.log(roomName);
        if(roomName){

            setMessages(
                rooms.concat({
                    id:`${rooms.length+1}`,
                    data:{
                        name:roomName,
                        messages:[]
                    }
                })
            )
           
            console.log(rooms);
           
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} key={id}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    )
}

export default SidebarChat
