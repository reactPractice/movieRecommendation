import * as types from '../actions/MovieInfo';
import update from 'react-addons-update';

const initialState = {
    genre: 28,
    currentIndex: 0,
    data: [0, 1, 2],
    
    movieData:[
        [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]
    ],
    page:[
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1},
        {page:1}
    ],
    rating: [
        [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]  
    ]
};

export default function movieInfo(state = initialState, action) {
    switch(action.type) {
        case types.MOVIE_SIMPLE:
            return {...state, movieData: update(
                state.movieData, {
                    [state.currentIndex]: {
                        $push: [action.data]
                    }
                }
                ), rating: update(
                    state.rating, {
                        [state.currentIndex]: {
                            $push: [{stars:0}]
                        }
                    }        
            )};
        case types.MOVIE_EMPTY:/*
            return {...state, page: 1, movieData: update(
                state.movieData, {
                    $splice: [[0, state.movieData.length]]
                }
            )};*/
            return {
              ...state, movieData: [ [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[] ], 
              page: update(
                    state.page, {
                        [state.currentIndex]: {
                            page: {$set:1}
                        }
                    }            
            )};
        case types.MOVIE_RATING:
            return {...state, rating: update(
                state.rating, {
                    [state.currentIndex]: {
                        [action.index]: {
                            stars: {$set:action.stars}                            
                        }
                    }
                }
            )};
        case types.MOVIE_RATING_HEROKU:
            return {...state, rating: update(
                state.rating, {
                    [action.currentIndex]: {
                        [action.index]: {
                            stars: {$set:action.stars}
                        }
                    }
                }    
            )};
        case types.MOVIE_PAGE:
            return {...state, page: update(
                    state.page, {
                        [state.currentIndex] : {
                            page: {$set: state.page[state.currentIndex].page + 1}
                        }
                    }
                )
                //page: state.page + 1
            };
        case types.MOVIE_GENRE:
            return {...state, 
                genre: action.genre,
                currentIndex: action.index
            };
        case types.PAGE_FIRST_LOADING:
            return {...state, page: update(
                state.page, {
                    [state.currentIndex]: {
                        isFirst: {$set:false}
                    }
                }
            )};
        case types.FETCH_DATA_SUCCESS:
            return {...state, data: action.data};  
        default:
            return state;
    }
}