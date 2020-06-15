import React from "react";
import axios from "axios";

export default function JokeList(props) {
  const [jokes, setJokes] = React.useState([]);
  function getJokes() {
    axios
      .get("http://localhost:5000/api/jokes", { withCredentials: true })
      .then(r => setJokes(r.data));
  }

  return jokes.length === 0 ? (
    <button onClick={getJokes}>Get Jokes</button>
  ) : (
    <ul>
      {jokes.map(joke => (
        <li key={joke.id}>{joke.joke}</li>
      ))}
    </ul>
  );
}
