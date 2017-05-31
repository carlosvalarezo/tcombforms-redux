import React, {Component} from 'react';
import TabContent from './TabContent';
import FlatButton from 'material-ui/FlatButton';
import {lightBlue50} from 'material-ui/styles/colors';
import AttributeOutput from './AttributeOutput';
import {Tabs, Tab} from 'material-ui/Tabs';


const styles = {
    width: '50%',
};

const styles2 = {
    display:'flex',
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

    handleDeleteAttribute(attribute) {
        this.props.onDeleteAttribute(attribute);
    }

    handleDeleteEnumeration(enumeration) {
        this.props.onDeleteEnumeration(enumeration);
    }

    render() {

        return (<div style={styles2}>
                <div style={styles}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <Tab label="One" value="1">
                            <TabContent attributesList={this.props.attributesList}
                                        handleEditAttribute={this.handleEditAttribute.bind(this)}
                                        handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                        handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                        category="1"/>
                        </Tab>
                        <Tab label="Two" value="2">
                            <TabContent attributesList={this.props.attributesList}
                                        handleEditAttribute={this.handleEditAttribute.bind(this)}
                                        handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                        handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                        category="2"/>
                        </Tab>
                        <Tab label="Three" value="3">
                            <TabContent attributesList={this.props.attributesList}
                                        handleEditAttribute={this.handleEditAttribute.bind(this)}
                                        handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                        handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                        category="3"/>
                        </Tab>
                        <Tab label="Four" value="4">
                            <TabContent attributesList={this.props.attributesList}
                                        handleEditAttribute={this.handleEditAttribute.bind(this)}
                                        handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                        handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                        category="4"/>
                        </Tab>
                        <Tab label="Five" value="5">
                            <TabContent attributesList={this.props.attributesList}
                                        handleEditAttribute={this.handleEditAttribute.bind(this)}
                                        handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                        handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                        category="5"/>
                        </Tab>
                    </Tabs>
                    <FlatButton label="Add attribute" backgroundColor={lightBlue50}
                                onClick={this.handleNewAttribute.bind(this)}/>
                </div>

                <div style={styles}>
                    <AttributeOutput attributesList={this.props.attributesList}/>
                </div>


            </div>
        );

    }
}
;
export default Attribute;
