import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';


export default class ReportItem extends React.Component {
    constructor(props) {
        super(props);
        // if (!this.props.chosenReport) {
        //   this.props.chosenReport = { text: 'הדיווח', category: 'קטגוריה', xCord: '2', yCord: '3', picture: 'aa', time: 'זמן'};
        // }
        this.state = {
            isEditing: false
        };
    }

   //  renderTaskSection() {
   //      const { task, isCompleted } = this.props;

   //      const taskStyle = {
   //          color: isCompleted ? 'green' : 'red',
   //          cursor: 'pointer'
   //      };
   //      }

   //      return (
   //          <Card>
			//     <CardTitle
			//       avatar="https://placeimg.com/80/80/animals"
			//     />
			//     <CardTitle
			//       title="קטגוריה"
			//       subtitle="Subtitle here"
			//     />
			//     <CardTitle
			//       title="זמן"
			//       subtitle="Subtitle here"
			//     />
			//     <CardTitle
			//       title="הדיווח"
			//       subtitle="Subtitle here"
			//     />
			//     <CardText>{dummyText}</CardText>
			//     <CardActions>
			//       <Button label="Action 1" />
			//       <Button label="Action 2" />
			//     </CardActions>
			// </Card>
   //      );
   //  }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </td>
            );
        }

        return (
            <td>
                <button onClick={this.onEditClick.bind(this)}>Edit</button>
                <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
            </td>
        );
    }

    render() {
        return (

                <Card className="grid-spaceAround" style={{background: "initial"}}>
			    <CardTitle className="col-5" style={{background: "white", marginTop: '20px'}}
			      subtitle={this.props.chosenReport.category}
			    />
			    <CardTitle className="col-5" style={{background: "white", marginTop: '20px'}}
			      subtitle={this.props.chosenReport.time}
			    />
			    <CardTitle className="col-11" style={{background: "white", marginTop: '20px'}}
			      subtitle={this.props.chosenReport.text}
			    />
			    <CardActions className="col-11 grid-spaceAround" style={{marginTop: '20px'}}>
          <CardTitle className="col-5" style={{background: "green", padding:'0'}}
            avatar={this.props.chosenReport.picture}
          />
			      <Button label="מחיקה" onClick={this.props.deleteRep.bind(this)} className="col-3" style={{background: "rgba(63, 81, 216, 0.72)"}} />
			      <Button label="עריכה" onClick={this.props.editReport.bind(this)} className="col-3" style={{background: "rgba(63, 81, 216, 0.72)"}} />
			    </CardActions>
			</Card>
        );
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    onSaveClick(event) {
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }
}
