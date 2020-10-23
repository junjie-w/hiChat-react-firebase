import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase';
import { actionTypes } from '../Reducer';
import { useStateValue } from '../StateProvider';
import './Login.css'

export const Login = () => {

  const [{ }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch(error => alert(error.message));
  }

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://visualpharm.com/assets/341/Weixing-595b40b75ba036ed117d6ddc.svg" alt="" />
        <div className="login__text">
          <h1>Sign in to hiChat</h1>
        </div>
        <Button type="submit" onClick={signIn} >Sign in with Google</Button>
      </div>
    </div>
  )
}
