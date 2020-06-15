import React from "react";
import axios from "axios";

export default function JokeList(props) {
  const [jokes, setJokes] = React.useState([]);
  React.useEffect(() => getJokes(), []);
  function getJokes() {
    axios
      .get("http://localhost:5000/api/jokes", { withCredentials: true })
      .then(r => setJokes(r.data))
      .catch(e => setJokes([{ id: 0, joke: e.response.data.message }]));
  }

  return (
    <ul>
      {jokes.map(joke => (
        <li key={joke.id}>{joke.joke}</li>
      ))}
    </ul>
  );
}
