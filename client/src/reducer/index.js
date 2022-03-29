import { GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME } from "../action";

const inicialState = {
  videogames: [],
};

function rootReducer(store = inicialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...store,
        videogames: action.payload,
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...store,
        videogames: action.payload,
      };

    default:
      return { ...store };
  }
}

export default rootReducer;
