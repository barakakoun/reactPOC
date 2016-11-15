import React from 'react';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import CategoriesDropdown from './categories-dropdown';

export default class ReportsList extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     error: null
        // };

        
        this.state = { text: 'aa', xCord: '2', yCord: '3', picture: 'aa', time: '', error: null };
    }

    componentWillReceiveProps(nextProps) {
        var hey = "hey";
        this.forceUpdate(nextProps.repToEdit);
    }

    renderFormTag() {
        // If edit and not create new
        // if (this.props.repToEdit) {
        //     // return (<Input value={this.props.repToEdit.text} type="text" />);
        //     this.setState(this.props.repToEdit);
        // }
        //this.state = { text: 'aaaa', xCord: '2', yCord: '3', picture: 'aa', time: '', error: null };
        // return (<Input value="nothing here" type="text" />);
    }

    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }

    render() {
        if (this.props.editMode) {
            return (
            <form onSubmit={this.handleFinishEditing.bind(this)}>
            <Input style={{fontSize: '1.2rem', background: 'white'}} type='text' label='הדיווח החדש' name='text' value={this.props.valueLink.value.text} onChange={this.handleChangee.bind(this, 'text')} maxLength={27 } required />
            <CategoriesDropdown style={{background: 'white'}} selectedCat={this.props.valueLink.value.category} onChangeCategory={this.handleChangee.bind(this)} />
            <Input style={{background: 'white'}} type='number' label='X' name='xCord' value={this.props.valueLink.value.xCord} onChange={this.handleChangee.bind(this, 'xCord')} />
            <Input style={{background: 'white'}} type='number' label='Y' name='yCord' value={this.props.valueLink.value.yCord} onChange={this.handleChangee.bind(this, 'yCord')} />
            <Input style={{background: 'white'}} type='text' label='תמונה' name='picture' value={this.props.valueLink.value.picture} onChange={this.handleChangee.bind(this, 'picture')} maxLength={27 } />
                <Button label='סיים' raised style={{background: "rgba(63, 81, 216, 0.72)"}} />
                {this.renderError()}
                </form>
        );
        }

        if (this.props.repToEdit) {
            return (
            <form onSubmit={this.handleCreate.bind(this)}>
                {this.renderFormTag()}
            <Input style={{fontSize: '1.2rem', background: 'white'}} type='text' label='הדיווח החדש' name='text' value={this.state.text} onChange={this.handleChange.bind(this, 'text')} maxLength={27 } required />
            <CategoriesDropdown style={{background: 'white'}} onChangeCategory={this.handleChange.bind(this)} />
            <Input style={{background: 'white'}} type='number' label='X' name='xCord' value={this.state.xCord} onChange={this.handleChange.bind(this, 'xCord')} />
            <Input style={{background: 'white'}} type='number' label='Y' name='yCord' value={this.state.yCord} onChange={this.handleChange.bind(this, 'yCord')} />
            <Input style={{background: 'white'}} type='text' label='תמונה' name='picture' value={this.state.picture} onChange={this.handleChange.bind(this, 'picture')} maxLength={27 } />
                <Button label='שמור/סיום' raised style={{background: "rgba(63, 81, 216, 0.72)"}} />
                {this.renderError()}
            </form>
        );
        }

        return (
            <form onSubmit={this.handleCreate.bind(this)}>
            <Input style={{fontSize: '1.2rem', background: 'white'}} type='text' label='הדיווח החדש' name='text' value={this.state.text} onChange={this.handleChange.bind(this, 'text')} maxLength={27 } required />
            <CategoriesDropdown style={{background: 'white'}} onChangeCategory={this.handleChange.bind(this)} />
            <Input style={{background: 'white'}} type='number' label='X' name='xCord' value={this.state.xCord} onChange={this.handleChange.bind(this, 'xCord')} />
            <Input style={{background: 'white'}} type='number' label='Y' name='yCord' value={this.state.yCord} onChange={this.handleChange.bind(this, 'yCord')} />
            <Input style={{background: 'white'}} type='text' label='תמונה' name='picture' value={this.state.picture} onChange={this.handleChange.bind(this, 'picture')} maxLength={27 } />
                <Button label='שמור/סיום' raised style={{background: "rgba(63, 81, 216, 0.72)"}} />
                {this.renderError()}
            </form>
        );
    }

    handleChange(name, value) {
	    this.setState({[name]: value});
	  };

      handleChangee(name, value) {
        this.props.valueLink.value[name] = value;
        this.props.valueLink.requestChange(this.props.valueLink.value);
      };

    handleEdit(event) {

        event.preventDefault();

        this.handleCreate(event)
    }

    handleCreate(event) {

        event.preventDefault();

        // const createInput = this.refs.createInput;
        // const task = createInput.value;
        // const validateInput = this.validateInput(task);

        // if (validateInput) {
        //     this.setState({ error: validateInput });
        //     return;
        // }

        this.setState({ error: null });

        this.props.createRep(this.state);
        // this.refs.createInput.value = '';

        this.setState({ id: '', text: '', category: '', xCord: '', yCord: '', picture: '', time: '', error: null });
    }

    handleFinishEditing(event) {

        event.preventDefault();

        this.setState({ error: null });

        this.props.editReport(this.state);
        // this.refs.createInput.value = '';

        this.setState({ id: '', text: '', category: '', xCord: '', yCord: '', picture: '', time: '', error: null });
    }

    validateInput(task) {
        if (!task) {
            return 'Please enter a task.';
        // } else if (_.find(this.props.reports, report => report.text === text)) {
        //     return 'Task already exists.';
        } else {
            return null;
        }
    }
}
