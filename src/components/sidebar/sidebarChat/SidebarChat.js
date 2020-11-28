import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import db from '../../../firebase';
import './SidebarChat.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import firebase from 'firebase';
import { useStateValue } from '../../../StateProvider';
import { actionTypes } from '../../../Reducer';

export const SidebarChat = ({ id, name, addNewChat }) => {
  //const [info, dispatch] = useStateValue();
  const [seed, setSeed] = useState('')
  const [messages, setMessages] = useState("");
  //const [deleted, setDeleted] = useState(false)
  const { roomId } = useParams();
  //const windowUrl = window.location.search;
  //const params = new URLSearchParams(windowUrl);
  let history = useHistory();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, []);

  useEffect(() => {
    if (id) {
      db.collection('rooms').doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data())));
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const deleteRoom = (id) => {
    db.collection("rooms").doc(id).delete().then(() => {
      //window.location = "/";
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    //setDeleted(!deleted);
    //dispatch(
    //  {
    //    type: actionTypes.SET_ROOM,
    //    deletedRoomId: id
    //  }
    //);
    history.replace("/");
  }

  return !addNewChat ? (
    //<Link to={`/rooms/${id}`}>
    //  <div className="sidebarChat">
    //    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
    //    <div className="sidebarChat__info">
    //      <h2>{name}</h2>
    //      <p>{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message}</p>
    //    </div>
    //    <div className="chatRoom__deleteButton">
    //      <IconButton className="deleteButton" onClick={() => deleteRoom(id)}>
    //        <DeleteOutlineIcon />
    //      </IconButton>
    //    </div>
    //  </div>
    //</Link>

    //<div className="sidebarChat">
    <div className="sidebarChatWithButton">
      <Link to={`/rooms/${id}`} className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 27)}{messages[0]?.message.length > 27 && "..."}</p>
        </div>
      </Link >
      {id !== roomId && (<div className="chatRoom__deleteButton">
        <IconButton className="deleteButton" onClick={() => deleteRoom(id)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>)}
      {/*<div className="chatRoom__deleteButton">
        <IconButton className="deleteButton" onClick={() => deleteRoom(id)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>*/}
    </div>
  ) : (
      <div onClick={createChat} className="sidebarChat">
        <h2>Create New Chat</h2>
      </div>
    )
}
