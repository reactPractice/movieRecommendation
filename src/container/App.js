import React from 'react';
import { connect } from 'react-redux';

import '../style/App.css';

import Home from '../components/views/Home';
import About from '../components/views/About';
import * as actions from '../actions';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: {},
      //activeKey: 1,
      mssg: '',
      i: 0
    };
    
    this.switchView = this.switchView.bind(this);
    this.changeMssg = this.changeMssg.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  switchView(activeKey) {
    this.setState({ activeKey: parseInt(activeKey) });
  }
  
  changeMssg(mssg) {
    this.setState({mssg: mssg});
  }
  
  componentWillMount() {
    console.log('data[0]:' + this.props.data[0]);
    console.log('data[1]:' + this.props.data[1]);
    console.log('data[2]:' + this.props.data[2]);
    console.log('page:' + this.props.page);
  }
  
  componentDidMount() {
    console.log('App.js : ' + JSON.stringify(this.props.data));
  }
  
  handleClick(genreId, index) {
    //this.props.emptyMovies(this.props.currentIndex);
    this.props.movieGenre(genreId, index);
    this.setState({i:index});
  }
  
  render() {
    return (
      <div className="ct" id="t1">
        <div className="ct" id="t2">
          <div className="ct" id="t3">
            <div className="ct" id="t4">
               <div className="ct" id="t5">
                <ul id="menu">
                  <span className="mssg">{this.state.mssg}</span>
                  <a href="#t1"><li className="icon glyphicon glyphicon-ok" id="uno" onMouseOver={() => this.changeMssg('영화보기')} 
                    onMouseLeave={() => this.changeMssg('')}></li></a>
                  <a href="#t2"><li className="icon glyphicon glyphicon-remove" id="dos" onMouseOver={() => this.changeMssg('영화 추천하기')} 
                    onMouseLeave={() => this.changeMssg('')}></li></a>
                  <a href="#t3"><li className="icon glyphicon glyphicon-zoom-in" id="tres" onMouseOver={() => this.changeMssg('추천 목록')} 
                    onMouseLeave={() => this.changeMssg('')}></li></a>
                  <a href="#t4"><li className="icon glyphicon glyphicon-file" id="cuatro"></li></a>
                  <a href="#t5"><li className="icon glyphicon glyphicon-road" id="cinco"></li></a>
                </ul>
                <div className="page" id="p1">
                   <section className="icon glyphicon glyphicon-ok">
                      <About msg='About1.js'/>
                   </section>  
                </div>
                <div className="page" id="p2">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9">
                          <Home movieData={this.props.movieData} getMovies={this.props.getMovies} setRating={this.props.setRating} 
                          nextPage={this.props.nextPage} page={this.props.page} genre={this.props.genre} emptyMovies={this.props.emptyMovies}
                          fetchData={this.props.fetchData} data={this.props.data} currentIndex={this.props.currentIndex}
                          rating={this.props.rating} selectedMovie={this.props.selectedMovie} movie_personal={this.props.movie_personal}
                          />
                      </div>
                      <div className="col-md-1" id='cssvmenu'>
                        <ul>
                           <li className={this.state.i==0 ? 'li-clicked' : null} onClick={() => this.handleClick(28, 0)}><span>액션</span></li>
                           <li className={this.state.i==1 ? 'li-clicked' : null}><span onClick={() => this.handleClick(12, 1)}>어드밴쳐</span></li>
                           <li className={this.state.i==2 ? 'li-clicked' : null}><span onClick={() => this.handleClick(16, 2)}>애니메이션</span></li>
                           <li className={this.state.i==3 ? 'li-clicked' : null}><span onClick={() => this.handleClick(35, 3)}>코미디</span></li>
                           <li className={this.state.i==4 ? 'li-clicked' : null}><span onClick={() => this.handleClick(80, 4)}>범죄</span></li>
                           <li className={this.state.i==5 ? 'li-clicked' : null}><span onClick={() => this.handleClick(99, 5)}>다큐멘터리</span></li>
                           <li className={this.state.i==6 ? 'li-clicked' : null}><span onClick={() => this.handleClick(18, 6)}>드라마</span></li>
                           <li className={this.state.i==7 ? 'li-clicked' : null}><span onClick={() => this.handleClick(10751, 7)}>가족</span></li>
                           <li className={this.state.i==8 ? 'li-clicked' : null}><span onClick={() => this.handleClick(14, 8)}>판타지</span></li>
                           <li className={this.state.i==9 ? 'li-clicked' : null}><span onClick={() => this.handleClick(36, 9)}>역사</span></li>
                           <li className={this.state.i==10? 'li-clicked' : null}><span onClick={() => this.handleClick(27, 10)}>호러</span></li>
                           <li className={this.state.i==11? 'li-clicked' : null}><span onClick={() => this.handleClick(10402, 11)}>음악</span></li>
                           <li className={this.state.i==12? 'li-clicked' : null}><span onClick={() => this.handleClick(9648, 12)}>미스테리</span></li>
                           <li className={this.state.i==13? 'li-clicked' : null}><span onClick={() => this.handleClick(10749, 13)}>로맨스</span></li>
                           <li className={this.state.i==14? 'li-clicked' : null}><span onClick={() => this.handleClick(878, 14)}>SF</span></li>
                           <li className={this.state.i==15? 'li-clicked' : null}><span onClick={() => this.handleClick(10770, 15)}>TV 영화</span></li>
                           <li className={this.state.i==16? 'li-clicked' : null}><span onClick={() => this.handleClick(53, 16)}>스릴러</span></li>
                           <li className={this.state.i==17? 'li-clicked' : null}><span onClick={() => this.handleClick(10752, 17)}>전쟁</span></li>
                           <li className={this.state.i==18? 'li-clicked' : null}><span onClick={() => this.handleClick(37, 18)}>서양문화</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page" id="p3">
                  <div className="container">
                      <About msg='About2.js' movie_personal={this.props.movie_personal} currentIndex={this.props.currentIndex}
                      selectedMovie={this.props.selectedMovie} selectedMovieRating={this.props.selectedMovieRating} movieData={this.props.movieData}
                      setRating={this.props.setRating}/>
                  </div>
                </div>
                <div className="page" id="p4">
                  <section className="icon glyphicon glyphicon-file">
                    <span className="title">Dribbble</span>
                    <p className="hint">
                      <a href="https://dribbble.com/albertohartzet" target="_blank">Im ready to play, <span className="hint line-trough">invite me </span> find me</a>
                    </p>
                    <p className="hint">Already invited by <a href="http://www.dribbble.com/mrpeters" target="_blank">Stan Peters</a></p>
                  </section>
                </div> 
                <div className="page" id="p5">
                  <section className="icon glyphicon glyphicon-road">
                    <span className="title">More</span>
                    <p className="hint">
                      <span>You love one page & CSS only stuff? </span><br/>
                      <a href="http://codepen.io/hrtzt/details/pgXMYb/" target="_blank">check this pen "Pure CSS One page vertical navigation"</a>
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movieData: state.movieInfo.movieData,
    page: state.movieInfo.page,
    genre: state.movieInfo.genre,
    data: state.movieInfo.data,
    currentIndex: state.movieInfo.currentIndex,
    rating: state.movieInfo.rating,
    movie_personal: state.movieRcm.movie_personal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovies: (movieData) => {dispatch(actions.movieInfoSimple(movieData))},
    setRating: (stars, index) => {dispatch(actions.movieInfoRating(stars, index))},
    nextPage: () => {dispatch(actions.moviePage())},
    movieGenre: (genre, index) => {dispatch(actions.movieGenre(genre, index))},
    emptyMovies: () => {dispatch(actions.movieEmpty())},
    fetchData: (url) => {dispatch(actions.fetchData(url))},
    selectedMovie: (data, currentIndex) => {dispatch(actions.moviePersonal(data, currentIndex))},
    selectedMovieRating: (genre, index, stars) => {dispatch(actions.moviePersonalRating(genre, index, stars))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);