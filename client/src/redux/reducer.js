import { GET_ALL_GAMES, SEARCH_GAMES, GET_GAME_DETAILS, LOADING, SET_PAGE, FILTER_BY_ORIGIN, RESET_FILTERS, FILTER_BY_GENRE, SORT } from "./actions"

const initialState = {
    games: [],
    notFilteredGames: [],
    searchResults: [],
    notFilteredResults: [],
    gameDetails: {},
    loading: true,
    page: 1,
    sorted: ""
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                games: action.payload,
                notFilteredGames: action.payload,
                loading: false
            }
        case SEARCH_GAMES:
            return {
                ...state,
                searchResults: action.payload.length ? action.payload.slice(0, 15) : false,
                notFilteredResults: action.payload.length ? action.payload.slice(0, 15) : false,
                loading: false
            }
        case GET_GAME_DETAILS:
            return {
                ...state,
                gameDetails: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case RESET_FILTERS:
            return {
                ...state,
                games: state.notFilteredGames,
                searchResults: state.notFilteredResults,
                sorted: ""
            }
        case FILTER_BY_ORIGIN:
            let filter
            if (action.payload === "legacy") filter = "number"
            else filter = "string"
            return {
                ...state,
                searchResults: state.searchResults.filter(e => typeof e.id === filter),
                games: state.games.filter(e => typeof e.id === filter)
            }
        case FILTER_BY_GENRE:
            return {
                ...state,
                searchResults: state.searchResults.filter(e => e.genres.includes(action.payload)),
                games: state.games.filter(e => e.genres.includes(action.payload))
            }
        case SORT:

            if (/b$/.test(state.sorted))
                return {
                    ...state,
                    searchResults: [...state.searchResults].sort((b, a) => a[action.payload].toString().localeCompare(b[action.payload].toString())),
                    games: [...state.games].sort((b, a) => a[action.payload].toString().localeCompare(b[action.payload.toString()])),
                    sorted: action.payload + "-a"
                }
            return {
                ...state,
                searchResults: [...state.searchResults].sort((a, b) => a[action.payload].toString().localeCompare(b[action.payload].toString())),
                games: [...state.games].sort((a, b) => a[action.payload].toString().localeCompare(b[action.payload.toString()])),
                sorted: action.payload + "-b"
            }
        default:
            return state
    }
}

export default rootReducer