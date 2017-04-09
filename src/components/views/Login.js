import React from 'react';
import { default as Fade } from 'react-fade';
import update from 'react-addons-update';
import 'whatwg-fetch';

import '../../style/login.css';

const fadeDuration = 1;

class Login extends React.Component {
  
    constructor() {
      super();
      this.state = {
        isLoading: false,
        username: '',
        password: '',
        signup: false,
        signUpId: '',
        signUpPw: '',
        labelClass: ''
      };
      
      this.login = this.login.bind(this);
      this.handleChange_login = this.handleChange_login.bind(this);
      this.handleChange_signup = this.handleChange_signup.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
    }
    
    handleChange_login(e) {
      let userInfo = {};
      userInfo[e.target.name] = e.target.value;
      this.setState(userInfo);
    }
    
    handleChange_signup(e) {
      let userInfo = {};
      userInfo[e.target.name] = e.target.value;
      this.setState(userInfo);
    }
    
    handleToggle() {
      this.setState({ signup: true });
    }
    
    login(e) {
      e.preventDefault();
      this.setState({ isLoading: true });
      let user = {};
      user.id = this.state.username;
      user.pw = this.state.password;
      
      fetch('https://moon-test-heroku.herokuapp.com/users/list', {
        method: 'GET',
        body: user
      })
      .then((response) => response.json())
      .then((data) => {
        return (data.map((item, i) => {
          if(user.id == item.id && user.pw == item.pw) {
            console.log('yes');
            this.setState({ isLoading: false });
          }
        }));
      })
      .then(() => {
        if(this.state.isLoading == true) {
          this.setState({ isLoading: false, password: '' });
        }
      })
      .catch(function(error) {console.error(error)});
      //localStorage.setItem('isLoggedIn', 'yes');
    }
    
    render() {
        
        const SignUp = (
          <div className="container">
            <form onSubmit={this.login} className="signupForm">
              <label className={this.state.signUpId ? 'active' : null}>Username</label>
        			<input name="signUpId" type="text" value={this.state.signUpId} onChange={this.handleChange_signup}/><br/>
        			<label className={this.state.signUpPw ? 'active' : null}>Password</label>
        			<input name="signUpPw" type="password" value={this.state.signUpPw} onChange={this.handleChange_signup}/><br/>
        			<button type="submit" id="login-button">Login</button>
            </form>
          </div>
        );
        
        const Login = (
          <div className="container">
            <h1 className={this.state.isLoading==true ? 'isLoading' : null}>Welcome</h1>
            {this.state.isLoading==true ? <div className="spinner spinner-visible"></div> : <div className="spinner spinner-invisible"></div>}
              <form onSubmit={this.login} className={this.state.isLoading==true ? 'formFade' : null}>
          			<input name="username" type="text" value={this.state.username} onChange={this.handleChange_login} placeholder="Username" />
          			<input name="password" type="password" value={this.state.password} onChange={this.handleChange_login} placeholder="Password" />
          			<button type="submit" id="login-button">Login</button>
              </form>
              <p className={this.state.isLoading==true ? 'pFade' : null}>아직 회원이 아니신가요? <span onClick={this.handleToggle}>회원가입</span></p>
          </div>  
        );
        
        return(
          <div className="wrapper">
            {this.state.signup == true ? SignUp : Login}
          </div>
        );
    }
    
}

export default Login;