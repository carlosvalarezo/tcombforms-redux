import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

class AttributeTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
        };
    }

    handleChange = (tab) => {
        this.setState({
            tab: tab,
        });
    };
    render()
    {
        return(
            <Tabs value={this.state.currentTab} onChange={this.handleChange}/>
        );
    }

};

export default AttributeTab;