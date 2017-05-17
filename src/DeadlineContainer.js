import React, { Component } from 'react';
import Deadline from './Deadline';
import AddDeadline from './AddDeadline';

export default class DeadlineContainer extends Component {
  filterDeadlines = () => {
    let deadlines = [];
    Object.keys(this.props.deadlines).map((sn) => {
      let deadline = this.props.deadlines[sn];
      if(deadline.done === false) {
        deadlines.push({
          sn: sn,
          subject: deadline.subject,
          title: deadline.title,
          content: deadline.content,
          time: deadline.time,
        });
      }
      return null;
    });
    deadlines.sort((a, b) => new Date(a.time) - new Date(b.time));
    // console.log(deadlines);
    return deadlines;
  };

  render() {
    return (
      <div>
        {
          this.filterDeadlines().map((deadline) => 
            <Deadline
              key={deadline.sn}
              sn={deadline.sn}
              subject={deadline.subject}
              title={deadline.title}
              content={deadline.content}
              time={deadline.time}
              updateData={this.props.updateData}
            />
          )
        }
        <AddDeadline addDeadline={this.props.addDeadline}/>
      </div>
    );
  }
}