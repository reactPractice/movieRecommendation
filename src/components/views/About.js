import React from 'react';
import 'whatwg-fetch';
import Cookie from 'react-cookie';
import $ from 'jquery';

import '../../style/About.css';
import { SpringGrid  } from 'react-stonecutter';
import ReactStars from 'react-stars';

const propTypes = {
    currentIndex: React.PropTypes.number,
    movie_personal: React.PropTypes.array,
    selectedMovie: React.PropTypes.func,
    selectedMovieRating: React.PropTypes.func,
    setRating: React.PropTypes.func,
    fetchtest: React.PropTypes.func,
    loadData: React.PropTypes.func
};

const defaultProps = {
    currentIndex: 0,
    movie_personal: [],
    selectedMovie: () => {console.log('selectedMovie is not defined.')},
    selectedMovieRating: () => {console.log('selectedMovieRating is not defined.')},
    setRating: () => {console.log('setRating is not defined.')},
    loadData: () => {console.log('loadData is not defined.')}
};

class About extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userData: 1,
            recMovies: []
        }
        this.isAlreadySelected = this.isAlreadySelected.bind(this);
        this.loadData = this.loadData.bind(this);
    }
    
    componentWillMount() {
        /*
        const userData = localStorage.userData;
        if(userData) {
          this.setState({
            userData: JSON.parse(userData)
          });
        }*/
        this.loadData();
    }
  
    componentDidMount() {
        //this.props.fetchtest('https://moon-test-heroku.herokuapp.com/books');
        this.props.loadData();
    }
    
    componentDidUpdate(prevProps, prevState) {
        /*
        if(JSON.stringify(prevProps.userData) != JSON.stringify(this.state.userData)) {
          localStorage.userData = JSON.stringify(this.state.userData);
        }
        */
    }
    /*
    componentWillReceiveProps(nextProps, nextState) {
        console.log('about/cookie:' + Cookie.load('loginId'));
    }
    */
    isAlreadySelected(newRating, data, genreIndex) {
        let i = 0;
        let j = 0;
        let bool = false;
        let itemIndex = -1;
        
        for(i=0; i<this.props.movie_personal.length; i++) {
            for(j=0; j<this.props.movie_personal[i].length; j++) {
                console.log("title:" + this.props.movie_personal[i][j].original_title);
                console.log("data title:" + data.original_title);
                if(this.props.movie_personal[i][j].original_title == data.original_title) {
                    bool = true;
                    itemIndex = j;
                    break;
                }
            }
            if(bool) break;
        }
        
        console.log('i:' + i + ' j:' + j);
        
        if(!bool) {
            this.props.selectedMovie(data, genreIndex);
        }else {
            console.log(this.props.currentIndex);
            this.props.setRating(newRating, this.props.movie_personal[i][j].iFromMovieData);
            this.props.selectedMovieRating(genreIndex, itemIndex, newRating);
        }
    }
    
    loadData() {
        let recMovies = {};
        $.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
            recMovies = data.movies;
        })
        .done(() => {
            this.setState({recMovies: recMovies});
        })
        .done(() => console.log('rec:' + JSON.stringify(this.state.recMovies)));
    }
    
    render(){
        
        const ratingChanged = (newRating, i, data) => {
            console.log('newRating:' + newRating);
            console.log('i:' + i);
            console.log('data:' + data);
            this.isAlreadySelected(newRating, data, this.props.currentIndex);
        };
        
        const mapToState = this.props.movie_personal.map((data, i) => {
            return (
                    <li key={`img-${i}-${data.title}`}>
                        <img
                            className="img-rounded test"
                            //onMouseOver={this.handleMouseOver.bind(this, data)}
                            src={data.img}
                        />
                        <div className="rating">
                            <ReactStars
                                iKey={i}
                                data={data}
                                //value={this.props.movieData[this.props.currentIndex][i].rating}
                                value={data.rating}
                                count={5}
                                //onChange={ratingChanged}
                                size={24}
                                color2={'#ffd700'}
                            />
                        </div>
                    </li>
                );
        //this.props.movie_personal.map((genre, i) => {
            //return genre.map((data, k) => {
            /*
                return (
                    <li key={`img-${k}-${data.original_title}`}>
                        <img
                            className="img-rounded test"
                            //onMouseOver={this.handleMouseOver.bind(this, data)}
                            src={data.poster_path}
                        />
                        <div className="rating">
                            <ReactStars
                                iKey={k}
                                data={data}
                                //value={this.props.movieData[this.props.currentIndex][i].rating}
                                value={data.stars}
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                color2={'#ffd700'}
                            />
                        </div>
                    </li>
                );
            */
            //});
        });
    
        return(
            <div className="container">
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
                        {/*{mapToState}*/}
                    </SpringGrid >
                </div>
            </div>
        );
    }
    
}

About.propTypes = propTypes;
About.defaultProps = defaultProps;

export default About;