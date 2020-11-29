import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import { SidebarChat } from './sidebarChat/SidebarChat';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from 'firebase';
import { actionTypes } from '../../Reducer';

export const Sidebar = () => {

  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection('rooms').orderBy('timestamp', 'desc').onSnapshot(snapshot => (setRooms(snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
    })))));
    return () => {
      unsubscribe();
    }
    //}, [deletedRoom])
  }, [])

  const signOut = () => {
    auth().signOut().then(() => {
      console.log("signed out")
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      })
    }).catch(error => {
      console.log(error)
    });
  }

  const [showDonut, setShowDonut] = useState(false)

  const toggleDonutButton = () => {
    setShowDonut(!showDonut)
  }

  return (
    <div className="sidebar">

      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton onClick={signOut}>
            <ExitToAppIcon />
          </IconButton>
          {showDonut && <IconButton onClick={toggleDonutButton}>
            <DonutLargeIcon />
          </IconButton>}
          {/*<IconButton>
            <ChatIcon />
          </IconButton>*/}
          <IconButton onClick={toggleDonutButton} className="sidebar__header__moreVert">
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search..." type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map(room =>
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />)}
      </div>

    </div >
  )
}
