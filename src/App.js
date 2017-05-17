import React, { Component } from 'react';
import './App.css';
import Logged from './Logged';
import Login from './Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, CircularProgress, Dialog, Checkbox} from 'material-ui';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import DeadlineContainer from './DeadlineContainer';

export default class App extends Component {
  state = {
    login: false,
    deadlines: {},
    ID: '',
    password: '',
    openDialog: false,
    rememberPassword: false,
    autoLogin: false,
  };
  
  getCookie = (cname) => {
      let name = cname + '=';
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
              return c.substring(name.length, c.length);
          }
      }
      return '';
  };

  componentWillMount() {
    let ID = this.getCookie('ID');
    let password = this.getCookie('password');
    if(ID && password) {
      this.setState({ID: ID, password: password, rememberPassword: true, autoLogin: true}, this.handleLogin);
    }
  }

  handleIDChange = (value) => {
    this.setState({ID: value});
  };

  handlePasswordChange = (value) => {
    this.setState({password: value});
  };

  catchStatus = (response) => {
    if (response.ok) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };

  toggleRememberPassword = () => {
    this.setState({rememberPassword: (this.state.rememberPassword ? false : true)});
  };

  handleLogin = () => {
    this.setState({openDialog: true});
    fetch('/api/data', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: this.state.ID,
        password: this.state.password,
      }),
    }).then(this.catchStatus)
      .then(response => response.json())
      .then((data) => {
        // console.log(data);
        if(data) {
          this.setState({
            login: true,
            deadlines: data,
            openDialog: false,
          });
          if(this.state.rememberPassword) {
            document.cookie = `ID=${this.state.ID}`;
            document.cookie = `password=${this.state.password}`;          
            // console.log(document.cookie);
          } else {
            document.cookie = `ID=`;
            document.cookie = `password=`;  
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  updateData = (sn, key, value) => {
    fetch(`/api/update`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: this.state.ID,
        password: this.state.password,
        sn: sn,
        key: key,
        value: value,
      }),
    }).then(this.catchStatus)
      .catch((error) => {
        console.error(error);
      });
  };

  addDeadline = (title, subject, time, content) => {
    let deadlines = this.state.deadlines;
    const sn = Math.floor((Math.random() * 10000));
    deadlines[sn] = {
      subject: subject,
      title: title,
      content: content,
      time: `${time}`,
      done: time < new Date() - 86400000 * 7 ? true : false,
    };
    this.setState({deadlines: deadlines});
    fetch(`/api/add`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: this.state.ID,
        password: this.state.password,
        sn: sn,
        title: title,
        subject: subject,
        time: time,
        content: content,
        done: time < new Date() - 86400000 * 7 ? true : false,
      }),
    }).then(this.catchStatus)
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Dialog
            title="Logining to NTU CEIBA..."
            open={this.state.openDialog}
          >
            <CircularProgress size={80} thickness={5} />
            <br />
            {this.state.autoLogin ? <Checkbox label="Cancel auto login from the next time" onCheck={this.toggleRememberPassword} /> : null}
          </Dialog>
          <div className="App-header">
            <AppBar
              title="DEIBA"
              zDepth={2}
              iconElementRight={this.state.login ? <Logged /> : <Login 
                handleLogin={this.handleLogin} 
                handleIDChange={this.handleIDChange} 
                handlePasswordChange={this.handlePasswordChange}
                toggleRememberPassword={this.toggleRememberPassword}
                ID={this.state.ID}
                password={this.state.password}
              />}
            />
          </div>
          <DeadlineContainer deadlines={this.state.deadlines} updateData={this.updateData} addDeadline={this.addDeadline}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
