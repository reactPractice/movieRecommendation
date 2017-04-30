import React from 'react';
import axios from 'axios';
import { SpringGrid  } from 'react-stonecutter';
import ReactStars from 'react-stars';
import ReactTooltip from 'react-tooltip';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../actions';

import * as RESOURCES from '../resources/API_KEY';
import '../style/Movies.css';

const propTypes = {
    movieData: React.PropTypes.array,
    page: React.PropTypes.array,
    getMovies: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    movie_personal: React.PropTypes.array,
    genre: React.PropTypes.number,
    currentIndex: React.PropTypes.number,
    movieRatingHeroku: React.PropTypes.func
};

const defaultProps = {
    movieData: [],
    movie_personal: [],
    page: [],
    getMovies: () => {console.error('getMovies is not defined.')},
    nextPage: () => {console.error('nextPage is not defined.')},
    genre: 28,
    currentIndex: 0,
    movieRatingHeroku: () => {console.error('movieRatingHeroku is not defined.')}
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
        $.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
            for(let i=0; i<data.movies.length; i++) {
                //this.props.movieRatingHeroku(data.movies[i].genre, data.movies[i].rating, data.movies[i].index);
            }
            //console.log(JSON.stringify(this.props.rating));
        });
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
    }
    
    render() {
        
        const ratingChanged = (newRating, i, data) => {
            let state = {
                id: localStorage.getItem('loginId'),
                title: data.original_title,
                rating: newRating,
                img: data.poster_path,
                genre: this.props.currentIndex,
                index: i,
                isThisFirstTimeToMakeId: true
            };
            console.log('genre:' + state.genre);
            
            //this.props.setRating(newRating, i);
            
            $.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
                if(data == null || data.length == 0 || data == undefined || data==0) {
                    $.post('https://moon-test-heroku.herokuapp.com/insert/favorite/movie', state, function(result, stats){
                        console.log(JSON.stringify(result));
                    });
                }else{
                    let bool = false;
                    let nextState = {};
                    
                    //별점을 누른 영화가 이미 사용자가 선택한 적이 있는 영화인지 검색
                    
                    for(let i=0; i<data.movies.length; i++) {
                        //this.props.herokuRating(data.movies[i].genre, data.movies[i].rating, data.movies[i].index);
                        if(data.movies[i].title == state.title) {
                            bool = true;
                            nextState.username = data.id;
                            nextState.title = data.movies[i].title;
                            nextState.newRating = newRating;
                        }
                        if(bool) break;
                    }
                    
                    //console.log(JSON.stringify(this.props.rating));
                
                    //영화가 이미 등록된 적이 있는 경우
                    if(bool) {
                        $.post('https://moon-test-heroku.herokuapp.com/update/favorite/movie', nextState, function(result, stats){
                            console.log('Update is done');
                        });
                    }else{
                        //그렇지 않은 경우는 해당 영화에 대한 정보를 등록한다.
                        //this.setState({isThisFirstTimeToMakeId: false})
                        console.log('변경 전 값:' + state.isThisFirstTimeToMakeId);
                        state.isThisFirstTimeToMakeId = false;
                        console.log('변경 후 값:' + state.isThisFirstTimeToMakeId);
                        //.then(() => { 
                            $.post('https://moon-test-heroku.herokuapp.com/insert/favorite/movie', state, function(result,stats){
                                console.log('Create ID & Update is done');
                            });
                       // });
                    }
                    
                }
            })
            .done(() => this.props.loadData());
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
                        <p><span className="tip glyphicon glyphicon-eye-open" aria-hidden="true"> {this.state.data.vote_count * 4}</span></p>
                        <p><span className="tip glyphicon glyphicon-heart" aria-hidden="true"> {this.state.data.vote_arrange}</span></p>
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
        );
    }
}

Movies.propTypes = propTypes;
Movies.defaultProps = defaultProps;

export default Movies;