//This component will hold all the AttributeForm components that will be created with the button ADDCOMPONENT
import React, {Component} from 'react';
import AttributeForm from '../forms/AttributeForm';

//Create the attribute in the store and in the UI
class TabContent extends Component {

    render() {
        <AttributeForm attributesList={this.props.attributesList} />
    }
};
export default TabContent;