import _ from 'lodash';
import React from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

export default class ReportsList extends React.Component {
    renderItems() {
        const props = _.omit(this.props, 'reports');

        console.log(this.props);


        return _.map(this.props.reports, (report, index) => <ListItem key={index} onClick={this.props.chooseReportListItem.bind(this, report)} legend={report.time} caption={report.text} avatar={report.picture} />);

        return (
            <ListItem
                  caption='Dr. Manhattan'
                  legend="Jonathan 'Jon' Osterman"
                  rightIcon='star'
                />
            );
        //const { task, isCompleted } = this.props;
        return _.map(this.props.reports, (report, index) => <TodosListItem key={index} {...report} {...props} />);
    }

    render() {
        return (
            <List selectable ripple>
                <ListSubHeader caption='רשימת דיווחים' />
                {this.renderItems()}
            </List>
        );
    }
}