//This component will hold all the AttributeForm components that will be created with the button ADDCOMPONENT
import React, {Component} from 'react';
import AttributeForm from '../forms/AttributeForm';

//Create the attribute in the store and in the UI
class ChipsItem extends Component {

    render() {
        var attributeForms = this.props.attributesList.map((attribute) => {
                return ( <div>
                    <AttributeForm attribute={attribute} handleEditAttribute={this.props.handleEditAttribute}/>
                </div>);
            }
        )
        return <div>{attributeForms}</div>;
    }
}
;
export default TabContent;