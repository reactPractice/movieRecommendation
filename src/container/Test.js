import React from 'react';
import 'whatwg-fetch';
import axios from 'axios';

export default class Test extends React.Component {
    
    handleClick() {
        const header = {
            'Content-Type' : 'application/json',
            Authorization: 'moonformeli',
            'Access-Control-Allow-Origin': "whatever"
        }
        /*
        fetch('https://moon-test-heroku.herokuapp.com/books', {headers: header})
        //fetch('https://jsonplaceholder.typicode.com/posts/1', {headers: header})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log('error');
        });*/
        axios.get('http://moon-test-heroku.herokuapp.com/books')
        .then(function(res) {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render(){
        return(
            <div>
                <button onClick={this.handleClick.bind(this)}>Click me</button>
            </div>
        );
    }
    
}