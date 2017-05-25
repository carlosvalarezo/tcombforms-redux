import React, {Component} from 'react';
import AttributeForm from '../forms/AttributeForm';
import FlatButton from 'material-ui/FlatButton';
import {lightBlue50} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
//Create the attribute in the store and in the UI
class Attribute extends Component {
    constructor(props) {
        super(props);
    }

    handleNewAttribute() {
        this.props.onCreateAttribute();
        console.log("LIST = ", this.props.attributesList);
    }

    handleEditAttribute()
    {
        this.props.onChangeAttribute()
    }

    render() {
        return <div>
                <AttributeForm/>
                <FlatButton label="Add attribute" backgroundColor={lightBlue50} onClick={this.handleNewAttribute.bind(this)}/>
                </div>
    }
}
;
export default Attribute;
