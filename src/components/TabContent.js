import React, {Component} from 'react';
import AttributeForm from '../forms/AttributeForm';

class TabContent extends Component {
    constructor(props) {
        super(props);
        this.state = {category:''}
    }

    componentWillReceiveProps()
    {
        this.setState({category:this.props.category});
    }

    render() {
        //console.log("attlist ", this.props.attributesList);
        var attributeForms = this.props.attributesList.filter((attribute)=> {
            return (attribute.category === this.state.category);
        }).map((attribute) => {
                return (
                    <AttributeForm attribute={attribute} key={attribute.id}
                                   handleEditAttribute={this.props.handleEditAttribute}
                                   handleDeleteAttribute={this.props.handleDeleteAttribute}
                                   handleDeleteEnumeration={this.props.handleDeleteEnumeration}
                    />
                );
            }
        );
        return <div>{attributeForms}</div>;
    }
}

export default TabContent;