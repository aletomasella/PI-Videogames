import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames } from "../action";

function Homepage() {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => dispatch(getAllVideogames());

  return (
    <>
      <h2>Hola soy la Homepage</h2>
      <input
        type="text"
        placeholder="Search for Videogames"
        value={input}
        onChange={handleChange}
      />
      <input type="submit" onClick={handleSubmit} />
    </>
  );
}

export default Homepage;
