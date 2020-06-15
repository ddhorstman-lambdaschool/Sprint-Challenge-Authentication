import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ isLoggedIn }) {
  return (
    <nav>
      <NavLink to='/jokes'>Jokes</NavLink>
      {isLoggedIn ? (
        <NavLink to='/logout'>Log Out</NavLink>
      ) : (<>
        <NavLink to='/login'>Log In</NavLink>
        <NavLink to='/register'>Sign Up</NavLink></>
      )}
    </nav>
  );
}
