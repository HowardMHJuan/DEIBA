import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {FlatButton, Avatar} from 'material-ui';
import Done from 'material-ui/svg-icons/action/done';
import EditDialog from './EditDialog';
import {
  deepPurple900,
  pink900,
  red900,
  red800,
  orange900,
  orange800,
  yellow700,
  yellow600,
  lightGreen700
} from 'material-ui/styles/colors';

export default class Deadline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      title: this.props.title,
      content: this.props.content,
      onHoverAvatar: false,
      openDialog: false,
    };
  }

  handleDone = () => {
    this.setState({done: (this.state.done ? false : true)}, () => {this.props.updateData(this.props.sn, 'done', this.state.done)});
  };

  toggleAvatar = () => {
    this.setState({onHoverAvatar: true});
  };

  resumeAvatar = () => {
    this.setState({onHoverAvatar: false});
  };

  avatarColor = (time, time_for_deadline) => {
    const time_remain = Math.floor((time_for_deadline.getTime() - time.getTime()) / 86400000);
    if(time_remain < 0) return deepPurple900;
    switch(time_remain) {
      case 0:
        return pink900;
      case 1:
        return red900;
      case 2:
        return red800;
      case 3:
        return orange900;
      case 4:
        return orange800;
      case 5:
        return yellow700;
      case 6:
        return yellow600;
      default:
        return lightGreen700;
    }
  };

  displayAvatar = () => {
    if(this.state.done === true) {
      return (
        <Avatar 
          icon={<Done />}
          onClick={this.handleDone}
          size={60}
        />
      );
    } else {
      const time = new Date();
      const time_for_deadline = new Date(this.props.time);
      return (
        <Avatar
          onMouseOver={this.toggleAvatar}
          onMouseOut={this.resumeAvatar}
          onClick={this.handleDone}
          backgroundColor={this.avatarColor(time, time_for_deadline)}
          size={60}
        >
          {this.state.onHoverAvatar ? 'Done' : Math.floor((time_for_deadline.getTime() - time.getTime()) / 86400000)}
        </Avatar>
      );
    }
  };

  handleOpenDialog = () => {
    this.setState({openDialog: true});
  };

  handleCloseDialog = () => {
    this.setState({openDialog: false});
  };

  handleSubmit = () => {
    this.handleCloseDialog();
    this.props.updateData(this.props.sn, 'title', this.state.title);
    setTimeout(() => {this.props.updateData(this.props.sn, 'content', this.state.content)}, 3000);    
  };

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  };

  handleContentChange = (e) => {
    this.setState({content: e.target.value});
  };

  getTime = () => {
    const time = new Date(this.props.time);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = (`0${time.getHours()}`).slice(-2);
    const minute = (`0${time.getMinutes()}`).slice(-2);
    return `${year}/${month}/${date} ${hour}:${minute}`;
  };

  render() {
    return (
      <Card>
        <CardHeader
          title={this.state.title}
          subtitle={this.props.subject}
          actAsExpander={false}
          showExpandableButton={true}
          avatar={this.displayAvatar()}
        >
          Due at: {this.getTime()}
        </CardHeader>
        <CardActions>
          <FlatButton label={this.state.done ? "Undo" : "Done"} onTouchTap={this.handleDone}/>
          <FlatButton label="Edit" onTouchTap={this.handleOpenDialog}>
            <EditDialog
              open={this.state.openDialog}
              handleCloseDialog={this.handleCloseDialog}
              title={this.state.title}
              subject={this.props.subject}
              time={this.getTime()}
              content={this.state.content}
              handleTitleChange={this.handleTitleChange}
              handleContentChange={this.handleContentChange}
              handleSubmit={this.handleSubmit}
            />
          </FlatButton>
        </CardActions>
        <CardText expandable={true}>
          {`${this.state.content}`}
        </CardText>
      </Card>
    );
  }
}