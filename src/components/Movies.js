import React from 'react';
import axios from 'axios';
import { SpringGrid  } from 'react-stonecutter';
import ReactStars from 'react-stars';
import ReactTooltip from 'react-tooltip';

import * as RESOURCES from '../resources/API_KEY';
import '../style/Movies.css';

const propTypes = {
    movieData: React.PropTypes.array,
    page: React.PropTypes.array,
    getMovies: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    movie_personal: React.PropTypes.array,
    genre: React.PropTypes.number
};

const defaultProps = {
    movieData: [],
    movie_personal: [],
    page: [],
    getMovies: () => {console.error('getMovies is not defined.')},
    nextPage: () => {console.error('nextPage is not defined.')},
    genre: 28
};

class Movies extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
          data: {},
          genre: 28
        };
        
        //this.getMovieLists = this.getMovieLists.bind(this);
        //this.fetchData = this.fetchData.bind(this);
        this.loadMoreData = this.loadMoreData.bind(this);
    }
    /*
    fetchData() {
        this.props.fetchData('https://api.themoviedb.org/3/discover/movie?api_key=' + RESOURCES.KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + this.props.page + '&with_genres=' + this.props.genre);
    }*/
    /*
    getMovieLists() {
        //axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + RESOURCES.KEY + '&language=en-US&page=' + this.props.page)
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + RESOURCES.KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' 
            + this.props.movieData[this.props.currentIndex].page + '&with_genres=' + this.state.genre)
            .then(res => {
                res.data.results.map((data, i) => {
                    let state = {};
                    state.original_title = data.original_title;
                    state.overview = data.overview;
                    state.release_date = data.release_date;
                    state.vote_arrange = data.vote_average;
                    state.vote_count = data.vote_count;
                    state.poster_path = "http://image.tmdb.org/t/p/w185/" + data.poster_path;
                    state.popularity = data.popularity;
                    state.rating = 0;
                    this.props.getMovies(state);
                    this.props.nextPage();
                });
        });
    }*/
    
    componentWillMount() {
        console.log('ComponentWillMount-this.Props:' + this.props.genre);
    }
    
    //GET API Data
    
    componentDidMount() {
        //this.props.fetchData('https://api.themoviedb.org/3/discover/movie?api_key=' + RESOURCES.KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + this.props.page + '&with_genres=' + this.props.genre);
        this.loadMoreData();
    }
    
    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.genre) != JSON.stringify(this.props.genre)){
            this.props.fetchData('https://api.themoviedb.org/3/discover/movie?api_key=' + RESOURCES.KEY + 
                '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + 
                this.props.page[this.props.currentIndex].page + '&with_genres=' + nextProps.genre);
        }
    }
    /*
    shouldComponentUpdate(nextProps, nextState){
        console.log('nextProps:' + nextProps.genre);
        console.log('this.props:' + this.props.genre);
        return (JSON.stringify(nextProps.genre) != JSON.stringify(this.props.genre));
    }*/
    
    componenWillUpdate(nextProps, nextState) {
        //this.getMovieLists();
        console.log('This means shouldComponentUpdate default value is true');
    }
    
    handleMouseOver(data){
        this.setState({
            data: data
        });
    }
    
    loadMoreData() {
        this.props.fetchData('https://api.themoviedb.org/3/discover/movie?api_key=' + RESOURCES.KEY + 
        '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + 
        this.props.page[this.props.currentIndex].page + '&with_genres=' + this.props.genre);
        //console.log(JSON.stringify(this.props.page));
        //console.log('currentIndex:' + this.props.currentIndex);
        //console.log('page[' + this.props.currentIndex + '] : ' + this.props.page[this.props.currentIndex].page);
    }
    
    render() {
        
        const ratingChanged = (newRating, i, data) => {
            let state = {};
            state = data;
            state.stars = newRating;
            state.iFromMovieData = i;
            
            this.props.setRating(newRating, i);
            this.props.selectedMovie(data, this.props.currentIndex);
            //this.props.moviePersonal(state, this.props.currentIndex);
        };
        
        const mapToState = this.props.movieData[this.props.currentIndex].map((data, i) => {
            return (
                <li key={`img-${i}-${data.original_title}`}>
                    <img
                        data-tip
                        data-for={`img-${i}`}
                        className="img-rounded test"
                        onMouseOver={this.handleMouseOver.bind(this, data)}
                        src={data.poster_path}
                    />
                    <div className="rating">
                        <ReactStars
                            iKey={i}
                            data={data}
                            //value={this.props.movieData[this.props.currentIndex][i].rating}
                            value={this.props.rating[this.props.currentIndex][i].stars}
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            color2={'#ffd700'}
                        />
                    </div>
                    <ReactTooltip id={`img-${i}`}>
                        <p><span className="glyphicon glyphicon-eye-open" aria-hidden="true"> {this.state.data.vote_count * 4}</span></p>
                        <p><span className="glyphicon glyphicon-heart" aria-hidden="true"> {this.state.data.vote_arrange}</span></p>
                    </ReactTooltip>
                </li>
            );
        });
        
        return(
            <div className="container">
                    <SpringGrid 
                        component="ul"
                        columns={4}
                        columnWidth={200}
                        gutterWidth={10}
                        gutterHeight={200}
                        itemHeight={150}
                        springConfig={{ stiffness: 170, damping: 26 }}
                    >
                        {mapToState}
                        
                    <button className="btn myBtn" onClick={() => this.loadMoreData()}>더 많은 영화보기</button>
                    </SpringGrid >
            </div>
            /*
            <div className="a container">
                하하하하하:{JSON.stringify(this.props.movieData)}
                <button className="a" onClick={() => {console.log(JSON.stringify(this.props.data))}}>click me</button>
            </div>*/
                    /*
                <InfiniteScroll
                    //next={this.props.fetchData('https://api.themoviedb.org/3/discover/movie?api_key=' + RESOURCES.KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + this.props.page + '&with_genres=' + this.props.genre)}
                    //next={console.log('scroll is end')}
                    next={this.fetchData()}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                </InfiniteScroll>*/
        );
    }
}

Movies.propTypes = propTypes;
Movies.defaultProps = defaultProps;

export default Movies;