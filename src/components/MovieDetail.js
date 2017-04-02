import React from 'react';

const propTypes = {
    data: React.PropTypes.object.isRequired
};

const defaultProps = {
    data: {}
};

class MovieDetail extends React.Component {
    
    render() {
        return(
            <div>
                <img className="img-rounded" src={this.state.data.poster_path}/><p></p>
                <p className="tooltip-description">이 영화를 평가한 관객 수</p>
                <p><span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.state.data.vote_count}</p>
                <p>영화 평점</p>
                <p><span className="glyphicon glyphicon-heart" aria-hidden="true"></span> {this.state.data.vote_arrange}</p>
                <p>인기도</p>
                <p><span className="glyphicon glyphicon-stats" aria-hidden="true"></span> {this.state.data.popularity}</p>
            </div>
        );
    }
    
}

MovieDetail.propTypes = propTypes;
MovieDetail.defaultProps = defaultProps;

export default MovieDetail;