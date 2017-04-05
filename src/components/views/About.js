import React from 'react';
import 'whatwg-fetch';

import { SpringGrid  } from 'react-stonecutter';
import ReactStars from 'react-stars';

const propTypes = {
    currentIndex: React.PropTypes.number,
    movie_personal: React.PropTypes.array,
    selectedMovie: React.PropTypes.func,
    selectedMovieRating: React.PropTypes.func,
    setRating: React.PropTypes.func,
    fetchtest: React.PropTypes.func
};

const defaultProps = {
    currentIndex: 0,
    movie_personal: [],
    selectedMovie: () => {console.log('selectedMovie is not defined.')},
    selectedMovieRating: () => {console.log('selectedMovieRating is not defined.')},
    setRating: () => {console.log('setRating is not defined.')}
};

class About extends React.Component {
    
    constructor(props) {
        super(props);
        this.isAlreadySelected = this.isAlreadySelected.bind(this);
    }
    
    componentDidMount() {
        //this.props.fetchtest('https://moon-test-heroku.herokuapp.com/books');
    }
    
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
    
    handleClick() {
        //this.props.fetchtest('https://moon-test-heroku.herokuapp.com/books');
        fetch('https://moon-test-heroku.herokuapp.com/users/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, X-www-form-urlencoded, *.*',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                id: 'Hubot',
                pw: '12345',
            })
        })
        .then((response) => {
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(JSON.stringify(data));
        })
        .catch((error) => console.log(error));
    }
    
    handleClick2(){
        fetch('https://moon-test-heroku.herokuapp.com/users/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        })
        .then((response) => {
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(JSON.stringify(data));
        })
        .catch((error) => console.log(error));
    }
    
    render(){
        
        const ratingChanged = (newRating, i, data) => {
            console.log('newRating:' + newRating);
            console.log('i:' + i);
            console.log('data:' + data);
            this.isAlreadySelected(newRating, data, this.props.currentIndex);
        };
        
        const mapToState = this.props.movie_personal.map((genre, i) => {
            return genre.map((data, k) => {
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
            });
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
                    </SpringGrid >
                    <button onClick={this.handleClick.bind(this)}>Hit</button>
                    <button onClick={this.handleClick2.bind(this)}>Hit</button>
                </div>
            </div>
        );
    }
    
}

About.propTypes = propTypes;
About.defaultProps = defaultProps;

export default About;