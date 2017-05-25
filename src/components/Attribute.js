import React, {Component} from 'react';
import TabContent from './TabContent';
import AttributeForm from '../forms/AttributeForm';
import FlatButton from 'material-ui/FlatButton';
import {lightBlue50} from 'material-ui/styles/colors';
import AttributeOutput from './AttributeOutput';
import {Tabs, Tab} from 'material-ui/Tabs';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

//Create the attribute in the store and in the UI
class Attribute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: '1'
        };
    }

    handleChange = (category) => {
        this.setState({
            category: category,
        });
    };

    handleNewAttribute() {
        this.props.onCreateAttribute(this.state.category);
    }

    handleEditAttribute(attribute) {
        this.props.onChangeAttribute(attribute);
    }

    render() {

        return (<div>
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="Category One" value="1">
                    <TabContent attributesList={this.props.attributesList}
                                handleEditAttribute={this.handleEditAttribute.bind(this)} category="1"/>
                </Tab>
                <Tab label="Category Dos" value="2">
                    <TabContent attributesList={this.props.attributesList}
                                handleEditAttribute={this.handleEditAttribute.bind(this)} category="2"/>
                </Tab>
                <Tab label="Category Tres" value="3">
                    <TabContent attributesList={this.props.attributesList}
                                handleEditAttribute={this.handleEditAttribute.bind(this)} category="3"/>
                </Tab>
                <Tab label="Category Cuatro" value="4">
                    <TabContent attributesList={this.props.attributesList}
                                handleEditAttribute={this.handleEditAttribute.bind(this)} category="4"/>
                </Tab>
                <Tab label="Category Five" value="5">
                    <TabContent attributesList={this.props.attributesList}
                                handleEditAttribute={this.handleEditAttribute.bind(this)} category="5"/>
                </Tab>
            </Tabs>
                <FlatButton label="Add attribute" backgroundColor={lightBlue50}
                            onClick={this.handleNewAttribute.bind(this)}/>
                <AttributeOutput attributesList={this.props.attributesList}/>
        </div>
    );

    }
    }
    ;
    export default Attribute;
