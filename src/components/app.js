import React from 'react';
import Router from 'react-router'; 
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import CreateTodo from './create-todo';
import CreateReport from './create-report';
import TodosList from './todos-list';
import ReportsList from './reports-list';
import { Button } from 'react-toolbox/lib/button';
import ReportItem from './report-item';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import linkState from 'react-link-state';
import Input from 'react-toolbox/lib/input';

const todos = [
{
    task: 'make React tutorial',
    isCompleted: false
},
{
    task: 'eat dinner',
    isCompleted: true
}
];

const reports = [
{
    id: 1,
    text: 'ראשון',
    category: 'רגיל',
    xCord: '300',
    yCord: '400',
    picture: '',
    time: 'sometime'
},{
    id: 2,
    text: 'שני',
    category: 'דחוף',
    xCord: '400',
    yCord: '500',
    picture: '',
    time: 'sometime2'
},{
    id: 3,
    text: 'שלישי',
    category: 'חשוב',
    xCord: '500',
    yCord: '600',
    picture: '',
    time: 'sometime3'
},
];

export class DisplayContainer2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: { textt: 'הדיווח', category: 'קטגוריההה'}};
    }
    render() {
        return (
            <div className="DisplayContainer">
                <h4>{this.state.value.textt}</h4>
                <h4>{this.state.value.category}</h4>
                <InputBox2 valueLink={linkState(this, 'value')} />
            </div>
        );
    }
}

export class InputBox2 extends React.Component {
    constructor(props) {
        super(props);
        // var tempp = this.props.valueLink.value;
        //this.state = this.props.valueLink.value;
    }
//valueLink={this.props.valueLink}
    handleChange(name, value) {
        //this.setState({[name]: value});
        this.props.valueLink.value[name] = value;
        this.props.valueLink.requestChange(this.props.valueLink.value);
        console.log(this);
      };

    render() {
        return (<div><Input type="text" name="textt" value={this.props.valueLink.value.textt} onChange={this.handleChange.bind(this, 'textt')}/>
                     <Input type="text" name="category" value={this.props.valueLink.value.category} onChange={this.handleChange.bind(this, 'category')}/></div>);
    }
}

// var DisplayContainer2 = React.createClass({
//     mixins: [LinkedStateMixin],
//     getInitialState:function(){
//         return{
//             value:'My Value'
//         }
//     },
//     render:function(){
//         return (
//             <div className="DisplayContainer">
//                 <h4>{this.state.value}</h4>
//                 <InputBox2 valueLink={this.linkState('value')} />
//             </div>
//         );
//     }
// });

// var InputBox2 = React.createClass({
//     render:function(){
//         return (<input type="text" valueLink={this.props.valueLink} />)
//     }
// });

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos, reports, chosenReport: { text: 'הדיווח', category: 'קטגוריההה', picture: 'aa', time: 'זמן'}, countId: 4, repToEdit: null, editMode: false
        };
        console.log(this.state);
    }

    renderCreateEdit() {
        if(!this.state.editMode) {
            return <CreateReport reports={this.state.reports} repToEdit={this.state.repToEdit} editMode={this.state.editMode} createRep={this.createRep.bind(this)} />;
        }

        return (<CreateReport reports={this.state.reports} editReport={this.editReport.bind(this)} valueLink={linkState(this, 'chosenReport')} editMode={this.state.editMode} createRep={this.createRep.bind(this)} />);
    }

    render() {
        return (
            <div style={{fontFamily: 'Helvetica'}} >
                <h1>React ToDos App</h1>
                <DisplayContainer2 />
                <div className="grid-spaceAround">
                    <div className="col-7">
                        <div className="grid-spaceAround">

                        <div className="col-12" style={{background: "rgba(0, 178, 217, 0.62)"}}>
                            {this.renderCreateEdit()}
                        </div>
                        <div className="col-5" style={{background: "rgba(0, 178, 217, 0.62)", marginTop: '20px'}}>...</div>
                        <div className="col-6" style={{background: "purple", marginTop: '20px'}}>...</div>
                        </div>
                    </div>
                    <div className="col-4" style={{background: "rgba(0, 178, 217, 0.62)"}}>
                        <ReportItem chosenReport={this.state.chosenReport} editReport={this.editReport.bind(this)} deleteRep={this.deleteRep.bind(this)} />
                        <ReportsList reports={this.state.reports} chooseReportListItem={this.chooseReportListItem.bind(this)}  />
                    </div>
                </div>
                <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)} />
            </div>
        );
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }

    createTask(task) {
        this.state.todos.push({
            task,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
    }

    editReport() {
        // this.setState({ repToEdit: this.state.chosenReport });
        var newVal = !this.state.editMode;
        this.setState({ editMode: newVal });
    }


    chooseReportListItem(task) {
        console.log("new func");
        console.log(task);
        this.setState({ chosenReport: task});
        // this.state.todos.push({
        //     task,
        //     isCompleted: false
        // });
        // this.setState({ todos: this.state.todos });
    }

    createRep(task) {

        if (task.id) {

            _.remove(this.state.reports, rep => rep.id === task.id);
            this.state.reports.push(task);
            // const foundRep = _.find(this.state.reports, rep => rep.id === task.id);

            // foundRep.picture = task.picture;

            this.setState({ reports: this.state.reports });
            this.setState({ repToEdit: null });
            this.setState({ chosenReport: task });
        }
        else {
            var currDate = new Date();
            var time = (currDate).getDate().toString() + "/" + ((currDate).getMonth()+1).toString() + "/" + (currDate).getFullYear().toString() + " " + (currDate).getHours().toString() + ":" + (currDate).getMinutes().toString();
            console.log('barak');
            console.log(task);

            this.state.reports.push({
                id: 4,
                text: task.text,
                category: task.category,
                xCord: task.xCord,
                yCord: task.yCord,
                picture: task.picture,
                time: time
            });

            this.setState({ reports: this.state.reports });
        }

    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
    }

    deleteRep() {
        _.remove(this.state.reports, rep => rep.id === this.state.chosenReport.id);
        this.setState({ reports: this.state.reports });
        this.setState({ chosenReport: { text: 'הדיווח', category: 'קטגוריההה', picture: 'aa', time: 'זמן'} });
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }
}
