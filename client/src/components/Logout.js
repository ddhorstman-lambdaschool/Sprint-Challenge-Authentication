import React from 'react';
import axios from 'axios';

export default function Logout(){
  function logout(){
    axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });
  }
  return <button onClick={logout}>Log Out</button>;
}
