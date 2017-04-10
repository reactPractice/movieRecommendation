import React from 'react';
import { default as Fade } from 'react-fade';
import update from 'react-addons-update';
import 'whatwg-fetch';
import $ from 'jquery';

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
        signUpPw: ''
      };
      
      this.login = this.login.bind(this);
      this.signUp = this.signUp.bind(this);
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
    
    signUp(e) {
      e.preventDefault();
      this.setState({ isLoading: true });
      console.log(this.state.signUpId, this.state.signUpPw);
      let user = {
        id: this.state.signUpId,
        pw: this.state.signUpPw
      };
      //user.id = this.state.signUpId;
      //user.pw = this.state.signUpPw;
      /*
      fetch('https://moon-test-heroku.herokuapp.com/users/signup', {
        method: 'POST',
        body: user
       
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8
          
        }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
      })
      .then(() => {
        this.setState({ isLoading: false, signup: false, signUpId: '', signUpPw: '' });
      })
      .catch(function(error) {console.error(error)});
      */
      
      $.ajax({
        url: 'https://moon-test-heroku.herokuapp.com/users/signup',
        type: 'POST',
        data: user,
        success: function(data) {
          console.log(JSON.stringify(data));
        },
        error: function(error) {
          console.error(error);
        }
      });
    }
    
    render() {
        
        const SignUp = (
          <div className="container">
            <h1 className={this.state.isLoading==true ? 'isLoading' : null}>Creating a new account</h1>
            {this.state.isLoading==true ? <div className="spinner spinner-visible"></div> : <div className="spinner spinner-invisible"></div>}
            <form onSubmit={this.signUp} className={this.state.isLoading==true ? 'formFade' : null}>
              <label className={this.state.signUpId ? 'active' : null}>Username</label>
        			<input name="signUpId" type="text" value={this.state.signUpId} onChange={this.handleChange_signup} required/><br/>
        			<label className={this.state.signUpPw ? 'active' : null}>Password</label>
        			<input name="signUpPw" type="password" value={this.state.signUpPw} onChange={this.handleChange_signup} required/><br/>
        			<button type="submit" id="login-button">Sign Up</button>
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