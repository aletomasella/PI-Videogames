import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_CREATION = "FILTER_BY_CREATION";

export function getAllVideogames() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames");
    console.log(response.data);
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: response.data,
    });
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    console.log(response.data);
    return dispatch({
      type: GET_VIDEOGAMES_BY_NAME,
      payload: response.data,
    });
  };
}

export function filterGamesByGenre(genre) {
  return {
    type: FILTER_BY_GENRE,
    payload: genre,
  };
}

export function filterGamesByCreation(payload) {
  return {
    type: FILTER_BY_CREATION,
    payload,
  };
}
