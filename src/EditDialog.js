import React, { Component } from 'react';
import {Dialog, FlatButton, TextField} from 'material-ui';

export default class EditDialog extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleCloseDialog}
      />,
      <FlatButton
        label="Confirm Edit"
        primary={true}
        onTouchTap={this.props.handleSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Edit Deadline"
          actions={actions}
          onRequestClose={this.props.closeDialog}
          open={this.props.open}
        >
          <TextField floatingLabelText="Title" value={this.props.title} onChange={this.props.handleTitleChange}/>
          <br />
          Subject: {this.props.subject}
          <br />
          Due at: {this.props.time}
          <br />
          <TextField floatingLabelText="Information" value={this.props.content} onChange={this.props.handleContentChange} multiLine={true} />
        </Dialog>
      </div>
    );
  }
}