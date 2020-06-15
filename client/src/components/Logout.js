import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Logout({ setLoginState }) {
  const history = useHistory();
  React.useEffect(
    () =>
      (function logout() {
        axios
          .get("http://localhost:5000/api/auth/logout", {
            withCredentials: true,
          })
          .then(() => setLoginState(false))
          .then(() => history.push("/login"));
      })(),
    []
  );
  return <div />;
}
