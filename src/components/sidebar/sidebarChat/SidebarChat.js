import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import db from '../../../firebase';
import './SidebarChat.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import firebase from 'firebase';
//import { useStateValue } from '../../../StateProvider';
//import { actionTypes } from '../../../Reducer';
import { useMediaQuery } from 'react-responsive';
//import SidebarChat_infoLastMsg from './SidebarChat_infoLastMsg';

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

  const [gray, setGray] = useState(false);
  const toggleGray = () => {
    setGray(true);
    setTimeout(() => { setGray(false) }, 850);
  }

  const max600 = useMediaQuery({ query: '(max-width: 600px)' });
  //const max480 = useMediaQuery({ query: '(max-width: 480px)' });
  //const max300 = useMediaQuery({ query: '(max-width: 300px)' });

  //const min601 = useMediaQuery({ query: '(min-width: 601px)' });
  //const max999 = useMediaQuery({ query: '(max-width: 999px)' });

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
    <div className={`sidebarChatWithButton ${gray && "chatRoom__gray"}`}>
      <Link to={`/rooms/${id}`} className="sidebarChat sidebarChat__">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} className="sidebarChat__avatar" />
        <div className="sidebarChat__info" onClick={toggleGray}>
          <h2 className="sidebarChat__info__roomName">{name}</h2>
          {/*<SidebarChat_infoLastMsg messages={messages} />*/}
          {/*<p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 27)}{messages[0]?.message.length > 27 && "..."}</p>*/}
          {/*{min1000 && <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 45)}{messages[0]?.message.length > 45 && "..."}</p>}
          {max999 && <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 27)}{messages[0]?.message.length > 27 && "..."}</p>}*/}
          {/*{min601 && <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 27)}{messages[0]?.message.length > 27 && "..."}</p>}*/}
          {/*{max480 && <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 10)}{messages[0]?.message.length > 10 && "..."}</p>
          }
          {max600 && <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 27)}{messages[0]?.message.length > 27 && "..."}</p>
          }*/}
          {/*{() => {
            if (max600) {
              return <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 10)}{messages[0]?.message.length > 10 && "..."}</p>
            } else if (max480) {
              return <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 27)}{messages[0]?.message.length > 27 && "..."}</p>
            } else if (max300) {
              return <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 5)}{messages[0]?.message.length > 5 && "..."}</p>
            }
          }
          }*/}
          {max600
            ?
            <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 8)}{messages[0]?.message.length > 8 && "..."}</p>
            :
            <p className="sidebarChat__info__lastMsg">{messages[0]?.name} {messages.length >= 1 && ": "} {messages[0]?.message.substr(0, 27)}{messages[0]?.message.length > 27 && "..."}</p>
          }
        </div>
      </Link >
      {/*{id !== roomId && (<div className="chatRoom__deleteButton">
        <IconButton className="deleteButton" onClick={() => deleteRoom(id)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>)}*/}
      <div className={`chatRoom__deleteButton ${gray && "chatRoom__deleteButton__gray"}`}>
        {/*<div className="chatRoom__deleteButton">*/}
        <IconButton className="deleteButton" onClick={() => deleteRoom(id)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
      {/*<div className="chatRoom__deleteButton">
        <IconButton className="deleteButton" onClick={() => deleteRoom(id)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>*/}
    </div>
  ) : (
      <div onClick={createChat} className="sidebarChat sidebarChat__createText">
        <h2 className="sidebarChat__createTitle">Create New Chat</h2>
      </div>
    )
}
