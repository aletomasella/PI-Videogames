import {
  FILTER_BY_CREATION,
  FILTER_BY_GENRE,
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
} from "../action";

const inicialState = {
  videogames: [],
  allVideogames: [],
};

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case FILTER_BY_GENRE:
      if (action.payload !== "All") {
        const allVideogames = [...state.allVideogames];
        const gamesFiltered = allVideogames.filter(
          (game) => game.genres && game.genres.includes(action.payload)
        );
        return {
          ...state,
          videogames: gamesFiltered,
        };
      } else {
        return {
          ...state,
          videogames: [...state.allVideogames],
        };
      }

    case FILTER_BY_CREATION:
      if (action.payload === "All") {
        return {
          ...state,
          videogames: [...state.allVideogames],
        };
      } else {
        const allVideogames = [...state.allVideogames];
        const filteredGames =
          action.payload === "Db"
            ? allVideogames.filter((el) => el.inDb)
            : allVideogames.filter((el) => !el.inDb);
        return {
          ...state,
          videogames: filteredGames,
        };
      }

    default:
      return { ...state };
  }
}

export default rootReducer;
