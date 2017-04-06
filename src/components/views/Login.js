import React from 'react';
import { default as Fade } from 'react-fade';

import '../../style/login.css';

const fadeDuration = 1;

class Login extends React.Component {
  
    constructor() {
      super();
      this.state = {
        fadeOut: false
      };
    }
    /*
    componentDidUpdate(nextProps, { fadeOut }) {
      console.log('didUpdate');
      if (fadeOut) {
        setTimeout(() => {
          this.setState({
            visibility: 'hidden'
          });
        }, 0.1);
      }
    }
    */
    login(e) {
      e.preventDefault();
      this.setState({ fadeOut: true });
      console.log('login');
      //localStorage.setItem('isLoggedIn', 'yes');
    }
    
    render() {
        
        return(
          <div className="wrapper">
            <div className="container">
              <h1>Welcome</h1>
                <form onSubmit={this.login.bind(this)} className={this.state.fadeOut ? 'formFade' : null}>
            			<input type="text" placeholder="Username" />
            			<input type="password" placeholder="Password" />
            			<button type="submit" id="login-button">Login</button>
                </form>
            </div>
          </div>
        );
    }
    
}

export default Login;