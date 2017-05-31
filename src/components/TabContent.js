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
        for (let i = 0; i < (this.props.attributesList.length > 0 ? this.props.attributesList.length : 0); i++)
            return this.props.attributesList[i].name == name;
        //console.log("=>", name);
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
                                   handleName={this.handleName.bind(this)}
                    />
                );
            }
        );
        return <div>{attributeForms}</div>;
    }
}

export default TabContent;