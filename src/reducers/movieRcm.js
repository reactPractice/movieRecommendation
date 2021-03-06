import * as types from '../actions/MovieInfo';
import update from 'react-addons-update';

const initialState = {
    //movie_personal: [ [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[] ],
    recMovies: []
};

export default function movieRcm(state = initialState, action) {
    switch(action.type) {
        /*
        case types.MOVIE_PERSONAL:
            return { ...state, movie_personal: update(
                state.movie_personal, {
                    [action.genre]: {
                        $push: [action.data]
                    }
                }    
            )};
        */
        case types.MOVIE_PERSONAL:
            return { ...state, recMovies: update(
                state.recMovies, {
                    $push: action.data
                }    
            )};
        case types.MOVIE_PERSONAL_RATING:
            return { ...state, movie_personal: update(
                state.movie_personal, {
                    [action.genre]: {
                        [action.index]: {
                            $merge: {stars: action.stars}
                        }
                    }
                }
            )};
        case types.EMPTY_PERSONAL:
            return { ...state, recMovies: update(
                state.recMovies, {
                    $splice: [[0, state.recMovies.length]]
                }    
            )};
        default:
            return state;
    }
}