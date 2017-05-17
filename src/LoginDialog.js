import React, { Component } from 'react';
import {Dialog, FlatButton, TextField, Checkbox} from 'material-ui';

export default class LoginDialog extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleCloseDialog}
      />,
      <FlatButton
        label="Login"
        primary={true}
        onTouchTap={this.props.handleSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Login to NTU CEIBA"
          actions={actions}
          onRequestClose={this.props.closeDialog}
          open={this.props.open}
        >
          <TextField floatingLabelText="Student ID" value={this.props.ID} onChange={this.props.handleIDChange}/>
          <br />
          <TextField floatingLabelText="Password" type="password" value={this.props.password} onChange={this.props.handlePasswordChange}/>
          <br />
          <br />
          <Checkbox label="Remember password in browser and auto login everytime I visit this site" onCheck={this.props.toggleRememberPassword}/>
          Your password is only for authentication and will not be saved at the server.
        </Dialog>
      </div>
    );
  }
}