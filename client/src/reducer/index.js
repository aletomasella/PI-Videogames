import { GET_VIDEOGAMES } from "../action";

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

    default:
      return { ...store };
  }
}

export default rootReducer;
