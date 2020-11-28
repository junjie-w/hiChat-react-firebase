import { Avatar, Button, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../StateProvider';
import Picker from 'emoji-picker-react';
import axios from '../../axios';

export const Chat = () => {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState(null);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  //console.log(roomId)

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setInput(input + emojiObject.emoji)
    //console.log(emojiObject)
  };

  //const addEmoji = (e) => {
  //  let emoji = e.native;
  //  setInput(input + emoji)
  //}

  useEffect(() => {
    if (roomId !== null && typeof roomId !== 'undefined') {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot(snapshot => typeof snapshot.data() !== "undefined" && setRoomName
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

  //const emptyRoom = async () => {
  //  console.log("clicked")
  //db.collection("rooms").doc(roomId).collection("messages").delete().then(() => {
  //  //window.location = "/";
  //  console.log("Document successfully deleted!");
  //}).catch(function (error) {
  //  console.error("Error removing document: ", error);
  //});
  //const ref = db.collection("rooms").doc(roomId).collection("messages")
  //db.collection("rooms").doc(roomId).collection("messages").onSnapshot(snapshot => {
  //  snapshot.docs.forEach(doc => {
  //    ref.doc().delete()
  //      .catch(error => {
  //        console.log(error)
  //      })
  //  })
  //})
  //await axios.delete(`/room/${roomId}`)
  //  .then(response => console.log(response))
  //  .catch(error => console.log("error", error));
  //const dbRefObject = db.collection("rooms").doc(roomId).collection("messages");
  //console.log("000", dbRefObject)
  //dbRefObject('value', (snapshot) => {
  //  snapshot.forEach((childSnapshot) => {
  //    let nodeKey = childSnapshot.key;
  //    firebase.database().ref("messages").child(nodeKey).remove();
  //  })
  //})
  //}

  //const getMessageId = db.collection('rooms').doc(roomId).collection('messages')
  //useEffect(() => {
  //  const unsubscribe = db.collection('rooms').orderBy('timestamp', 'desc').onSnapshot(snapshot => (setRooms(snapshot.docs.map(doc => ({
  //    id: doc.id,
  //    data: doc.data(),
  //  })))));
  //  return () => {
  //    unsubscribe();
  //  }
  //  //}, [deletedRoom])
  //}, [])

  const emptyRoom = () => {
    console.log(roomId);
    const ref = db.collection('rooms').doc(roomId).collection('messages');
    ref.onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        ref.doc(doc.id).delete()
      })
    })
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
                  messages[messages.length - 1]?.timestamp?.toDate()).toLocaleString()}
              </p>
            )}
          </div>
        ) : (
            <div className="chat__headerInfo  chat__headerHidden">
              <h3>Pick a room and happy chatting:)</h3>
              <p></p>
            </div>
          )}

        <div className="chat__headerRight">

          <Button variant="contained" onClick={() => emptyRoom()} className="emptyRoomButton">
            {/*Message overflow. Empty this room*/}
            Empty this room
          </Button>
          {/*<IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>*/}
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {roomId && messages.map(message => (
          <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toLocaleString()}</span>
          </p>
        ))}
      </div>

      {/*{showEmojiPicker && (
        <span className="chat__emojiPicker" >
          <Picker onEmojiClick={onEmojiClick} />
        </span>
      )}
      <div className="chat__footer">
        <IconButton onClick={toggleEmojiPicker} >
          <InsertEmoticonIcon />
        </IconButton>
        <form action="">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>*/}
      <div className="footerAndEmojiPicker">
        <div className="chat__footer">
          <IconButton onClick={toggleEmojiPicker} >
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
        {showEmojiPicker && (
          <span className="chat__emojiPicker" >
            <Picker onEmojiClick={onEmojiClick} />
          </span>
        )}
      </div>
    </div>
  )
}
