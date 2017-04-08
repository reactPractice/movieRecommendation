import React from 'react';
import { default as Fade } from 'react-fade';
import 'whatwg-fetch';

import '../../style/login.css';

const fadeDuration = 1;

class Login extends React.Component {
  
    constructor() {
      super();
      this.state = {
        isLoading: false,
        username: '',
        password: ''
      };
      
      this.login = this.login.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
      let userInfo = {};
      userInfo[e.target.name] = e.target.value;
      this.setState(userInfo);
    }
    
    login(e) {
      e.preventDefault();
      this.setState({ isLoading: true });
      
      let result = [];
      let user = {};
      user.id = this.state.username;
      user.pw = this.state.password;
      
      fetch('https://moon-test-heroku.herokuapp.com/users/list', {
        method: 'GET',
        body: user
      })
      .then((response) => response.json())
      .then((data) => {
        result.push(data);
      })
      .then(() => console.log(result))
      .catch(function(error) {console.error(error)});
      //localStorage.setItem('isLoggedIn', 'yes');
    }
    
    render() {
        
        return(
          <div className="wrapper">
            <div className="container">
              <h1 className={this.state.isLoading ? 'isLoading' : null}>Welcome</h1>
              {this.state.isLoading ? <div className="spinner spinner-visible"></div> : <div className="spinner spinner-invisible"></div>}
                <form onSubmit={this.login} className={this.state.isLoading ? 'formFade' : null}>
            			<input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
            			<input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
            			<button type="submit" id="login-button">Login</button>
                </form>
            </div>
          </div>
        );
    }
    
}

export default Login;