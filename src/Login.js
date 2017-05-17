import React, { Component } from 'react';
import {FlatButton} from 'material-ui';
import LoginDialog from './LoginDialog';

export default class Login extends Component {
  state = {
    openDialog: false,
  };

  handleIDChange = (e) => {
    this.props.handleIDChange(e.target.value);
  };

  handlePasswordChange = (e) => {
    this.props.handlePasswordChange(e.target.value);
  };

  handleOpenDialog = () => {
    this.setState({openDialog: true});
  };

  handleCloseDialog = () => {
    this.setState({openDialog: false});
  };

  handleSubmit = () => {
    this.handleCloseDialog();
    this.props.handleLogin();
  };

  render() {
    return (
      <FlatButton label="Login" onTouchTap={this.handleOpenDialog} style={{color: 'rgba(255, 255, 255, 1)'}} >
        <LoginDialog
          open={this.state.openDialog}
          handleCloseDialog={this.handleCloseDialog}
          ID={this.props.ID}
          password={this.props.password}
          handleIDChange={this.handleIDChange}
          handlePasswordChange={this.handlePasswordChange}
          handleSubmit={this.handleSubmit}
          toggleRememberPassword={this.props.toggleRememberPassword}
        />
      </FlatButton>
    );
  }
}
