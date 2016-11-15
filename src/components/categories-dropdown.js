import React from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
const state = {
	    selected: 1
	  };

const categories = [
	    { value: 'רגיל', color: 'green'},
	    { value: 'חשוב', color: 'orange'},
	    { value: 'דחוף', color: 'red'}
		];
export default class CategoriesDropdown extends React.Component {
	
    constructor(props) {
        super(props);

        this.state = {
            selected: '', categories
        };
    }

    render() {
        return (
            <Dropdown
            style={{background: 'white'}} 
        auto={false}
        source={this.state.categories}
        onChange={this.handleChange.bind(this)}
        label='קטגוריה'
        template={this.customItem} 
        value = {this.state.selected}/>
        );
    }

    handleChange(value) {
	    this.setState({selected: value});
	    this.props.onChangeCategory('category', value);
	  };

    customItem (item) {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: item.color
    };

    const imageStyle = {
      display: 'flex',
      width: '32px',
      height: '32px',
      flexGrow: 0,
      marginRight: '8px',
      backgroundColor: '#ccc'
    };

    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 2
    };

    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <strong>{item.value}</strong>
        </div>
      </div>
    );
  }
}