import React, {Component} from 'react';
import AttributeForm from '../forms/AttributeForm';

class TabContent extends Component {

    render() {
        var attributeForms = this.props.attributesList.filter((attribute)=> {
            return (attribute.category === this.props.category);
        }).map((attribute) => {
                return (<div>
                    <AttributeForm attribute={attribute} handleEditAttribute={this.props.handleEditAttribute}/>
                </div>);
            }
        );
        return <div>{attributeForms}</div>;
    }
}

export default TabContent;