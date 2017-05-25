import React, {Component} from 'react';
import TabContent from './TabContent';
import AttributeForm from '../forms/AttributeForm';
import FlatButton from 'material-ui/FlatButton';
import {lightBlue50} from 'material-ui/styles/colors';
import AttributeOutput from './AttributeOutput';

//Create the attribute in the store and in the UI
class Attribute extends Component {
    constructor(props) {
        super(props);
    }

    handleNewAttribute() {
        this.props.onCreateAttribute();
        console.log("LIST = ", this.props.attributesList);
    }

    handleEditAttribute(attribute)
    {
        console.log("original = " + attribute);
        this.props.onChangeAttribute(attribute);
    }

    render() {

        return <div>
                <TabContent attributesList={this.props.attributesList} handleEditAttribute={this.handleEditAttribute.bind(this)}/>
                <FlatButton label="Add attribute" backgroundColor={lightBlue50} onClick={this.handleNewAttribute.bind(this)}/>
                <AttributeOutput attributesList={this.props.attributesList}/>
                </div>
    }
}
;
export default Attribute;
