import * as types from './MovieInfo';

export function movieInfoSimple(data){
    return {
        type: types.MOVIE_SIMPLE,
        data
    };
}

export function movieEmpty(){
    return {
        type: types.MOVIE_EMPTY
    };
}

export function movieInfoRating(stars, index){
    return {
        type: types.MOVIE_RATING,
        stars,
        index
    };
}

export function moviePage(){
    return {
        type: types.MOVIE_PAGE
    }
}

export function movieGenre(genre, index){
    return (dispatch) => {
        fetch('../index.js')
            .then(() => {
                dispatch(movieEmpty());
            })
            .then(() => {
                dispatch(genreChange(genre, index));
            });
    }
}

export function genreChange(genre, index){
    return {
        type: types.MOVIE_GENRE,
        genre,
        index
    }
}

export function pageFirstLoading() {
    return {
        type: types.PAGE_FIRST_LOADING
    }
}

export function fetchHasErrored(bool) {
    return {
        type: types.FETCH_ERROR,
        hasErrored: bool
    }
}

export function fetchDataSuccess(data) {
    return {
        type: types.FETCH_DATA_SUCCESS,
        data
    }
}

export function fetchData(url) {
    return (dispatch) => {
            fetch(url)
                .then((response) => {
                    if(!response.ok) {
                        throw Error(response.statusText);
                    }
                    
                    dispatch(moviePage());
                    
                    return response;
                })
                .then((response) => response.json())
                .then((data) => {
                    data.results.map((data, i) => {
                        let state = {};
                        state.original_title = data.original_title;
                        state.overview = data.overview;
                        state.release_date = data.release_date;
                        state.vote_arrange = data.vote_average;
                        state.vote_count = data.vote_count;
                        state.poster_path = "http://image.tmdb.org/t/p/w185/" + data.poster_path;
                        state.popularity = data.popularity;
                        
                        dispatch(movieInfoSimple(state));
                        //dispatch(pageFirstLoading());
                    });
                })
                .catch(() => dispatch(fetchHasErrored(true)));
        }
}

export function moviePersonal(data, genre) {
    return {
        type: types.MOVIE_PERSONAL,
        data,
        genre
    }
}

export function moviePersonalRating(genre, index, stars) {
    return {
        type: types.MOVIE_PERSONAL_RATING,
        genre,
        index,
        stars
    }
}