import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../StateProvider';

export const Chat = () => {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot(snapshot => setRoomName
          (snapshot.data().name));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data())));
    }
  }, [roomId])

  const sendMessage = e => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  }

  return (
    <div className="chat">

      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        {roomId ? (
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            {messages.length >= 1 && (
              <p>last seen {" "}
                {new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
              </p>
            )}
          </div>
        ) : (
            <div className="chat__headerInfo">
              <h3>Pick a room and happy chatting:)</h3>
              <p></p>
            </div>
          )}

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map(message => (
          <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form action="">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>

    </div >
  )
}