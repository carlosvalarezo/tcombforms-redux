import React, {Component} from 'react';
import AttributeForm from '../forms/AttributeForm';


class TabContent extends Component {
    constructor(props) {
        super(props);
        this.state = {category: ''}
    }

    componentWillReceiveProps() {
        this.setState({category: this.props.category});
    }

    handleName(name) {
        return (this.props.attributesList.find((attribute) => {
            return attribute.name === name;
        })) ? true : false;
    }

    render() {
        var attributeForms = this.props.attributesList.filter((attribute)=> {
            return (attribute.category === this.state.category);
        }).map((attribute) => {
                return (

                    <AttributeForm attribute={attribute} key={attribute.id}
                                   handleEditAttribute={this.props.handleEditAttribute}
                                   handleDeleteAttribute={this.props.handleDeleteAttribute}
                                   handleDeleteEnumeration={this.props.handleDeleteEnumeration}
                                   handleButtonState={this.props.handleButtonState}
                                   handleName={this.handleName.bind(this)}
                    />



                );
            }
        );
        return <div>{attributeForms}</div>;
    }
}

export default TabContent;