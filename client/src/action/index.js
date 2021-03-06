import axios from "axios";
import api from "../apiRoutes";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_CREATION = "FILTER_BY_CREATION";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const VIDEOGAME_BY_ID = "VIDEOGAME_BY_ID";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";

export function getAllVideogames() {
  return async function (dispatch) {
    const response = await axios.get(api.getAllVideogames);
    console.log(response.data);
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: response.data,
    });
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    const response = await axios.get(`${api.getAllVideogamesByName}${name}`);
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

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
}

export function getVideogameById(id) {
  return async function (dispatch) {
    const response = await axios.get(`${api.getVideogamesById}${id}`);
    console.log(response.data);
    return dispatch({
      type: VIDEOGAME_BY_ID,
      payload: response.data,
    });
  };
}

export function createVideogame(game) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${api.createVideogame}`, game);
      console.log(response.data);
      return dispatch({
        type: CREATE_VIDEOGAME,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getAllGenres() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${api.getAllGenres}`);
      console.log(response.data);
      return dispatch({
        type: GET_GENRES,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
