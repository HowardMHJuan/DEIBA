import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {FlatButton, TextField, DatePicker, TimePicker, Avatar} from 'material-ui';

export default class AddDeadline extends Component {
  state = {
    title: '',
    subject: '',
    date: null,
    time: null,
    content: '',
  };

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handleSubjectChange = (e) => {
    this.setState({subject: e.target.value});
  }

  handleDateChange = (e, date) => {
    this.setState({date: date});
  }

  handleTimeChange = (e, time) => {
    this.setState({time: time});
  }

  handleContentChange = (e) => {
    this.setState({content: e.target.value});
  }

  handleAdd = () => {
    if(this.state.date === null || this.state.time === null) return false;
    const time = this.state.date.getTime() + this.state.time.getHours() * 3600000 + this.state.time.getMinutes() * 60000;
    // console.log(new Date(time));
    this.props.addDeadline(this.state.title, this.state.subject, new Date(time), this.state.content);
    this.setState({
      title: '',
      subject: '',
      date: null,
      time: null,
      content: '',
    });
  };

  render() {
    return (
      <Card>
        <CardHeader
          title="Add a new deadline"
          actAsExpander={false}
          showExpandableButton={false}
          avatar={<Avatar size={60}/>}
        />
        <CardText expandable={false}>
          <TextField floatingLabelText="Title" value={this.state.title} onChange={this.handleTitleChange}/>
          <br />
          <TextField floatingLabelText="Subject" value={this.state.subject} onChange={this.handleSubjectChange}/>
          <br />
          <DatePicker
            floatingLabelText="Due Date"
            value={this.state.date}
            onChange={this.handleDateChange}
            autoOk={true}
          />
          <TimePicker
            floatingLabelText="Due Time"
            value={this.state.time}
            onChange={this.handleTimeChange}
            format="24hr"
            autoOk={true}
          />
          <br />
          <TextField floatingLabelText="Information" value={this.state.content} onChange={this.handleContentChange} multiLine={true} />
          <FlatButton
            label="Add"
            primary={true}
            onTouchTap={this.handleAdd}
          />
        </CardText>
      </Card>
    );
  }
}