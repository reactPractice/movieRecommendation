import React from 'react';

import Movies from '../Movies';
import RESOURCES from '../../resources/API_KEY';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../../style/Home.css';

const propTypes = {
    movieData: React.PropTypes.array,
    page: React.PropTypes.array,
    getMovies: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    genre: React.PropTypes.number
};

const defaultProps = {
    movieData: [],
    page: [],
    getMovies: () => {console.error('getMovies is not defined')},
    nextPage: () => {console.error('nextPage is not defined')},
    genre: 28
};

class Home extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            data:{},
            isShowDetail: false
        };
        this.showDetail = this.showDetail.bind(this);
    }
    
    showDetail(data, isShowDetail) {
        this.setState({
            data:data,
            isShowDetail: isShowDetail
        });
    }
    
    componentWillMount() {
        console.log('Home.js will mount');
    }
    
    componentDidMount() {
        console.log('Home.js did mount');
    }
    
    /*
    shouldComponentUpdate(nextProps, nextState) {
        return (JSON.stringify(nextProps.genre) != JSON.stringify(this.props.genre));
    }*/
    
    render(){
        {/*
        const detail = (
            <div>
                <img className="img-rounded" src={this.state.data.poster_path}/><p></p>
                <p className="tooltip-description">이 영화를 평가한 관객 수</p>
                <p><span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.state.data.vote_count}</p>
                <p>영화 평점</p>
                <p><span className="glyphicon glyphicon-heart" aria-hidden="true"></span> {this.state.data.vote_arrange}</p>
                <p>인기도</p>
                <p><span className="glyphicon glyphicon-stats" aria-hidden="true"></span> {this.state.data.popularity}</p>
            </div>
        );*/}
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-8 contents-movies">
                         <Movies getMovies={this.props.getMovies} movieData={this.props.movieData} setRating={this.props.setRating}
                            showDetail={this.showDetail} nextPage={this.props.nextPage} page={this.props.page} genre={this.props.genre}
                            emptyMovies={this.props.emptyMovies} fetchData={this.props.fetchData}  selectedMovie={this.props.selectedMovie}
                            data={this.props.data} currentIndex={this.props.currentIndex} rating={this.props.rating}/>
                    </div>
                </div>
            </div>
        );
    }
    
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;