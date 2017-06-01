import React, {Component} from 'react';
import TabContent from './TabContent';
import FlatButton from 'material-ui/FlatButton';
import {lightBlue50} from 'material-ui/styles/colors';
import AttributeOutput from './AttributeOutput';
import {Tabs, Tab} from 'material-ui/Tabs';


const styles1 = {
    height: 600,
    overflowY: 'scroll'
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

        return (<div className="mui-container-fluid">
                <div className="row">
                    <div className="col-md-6">


                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                        >

                            <Tab label="One" value="1">
                                <div className="panel panel-primary">
                                    <div className="panel-body" style={styles1}>
                                        <TabContent attributesList={this.props.attributesList}
                                                    handleEditAttribute={this.handleEditAttribute.bind(this)}
                                                    handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                                    handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                                    category="1"/>
                                    </div>
                                </div>
                            </Tab>


                            <Tab label="Two" value="2">
                                <div className="panel panel-primary">
                                    <div className="panel-body" style={styles1}>
                                        <TabContent attributesList={this.props.attributesList}
                                                    handleEditAttribute={this.handleEditAttribute.bind(this)}
                                                    handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                                    handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                                    category="2"/>
                                    </div>
                                </div>
                            </Tab>
                            <Tab label="Three" value="3">
                                <div className="panel panel-primary">
                                    <div className="panel-body" style={styles1}>
                                        <TabContent attributesList={this.props.attributesList}
                                                    handleEditAttribute={this.handleEditAttribute.bind(this)}
                                                    handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                                    handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                                    category="3"/>
                                    </div>
                                </div>
                            </Tab>
                            <Tab label="Four" value="4">
                                <div className="panel panel-primary">
                                    <div className="panel-body" style={styles1}>
                                        <TabContent attributesList={this.props.attributesList}
                                                    handleEditAttribute={this.handleEditAttribute.bind(this)}
                                                    handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                                    handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                                    category="4"/>
                                    </div>
                                </div>
                            </Tab>
                            <Tab label="Five" value="5">
                                <div className="panel panel-primary">
                                    <div className="panel-body" style={styles1}>
                                        <TabContent attributesList={this.props.attributesList}
                                                    handleEditAttribute={this.handleEditAttribute.bind(this)}
                                                    handleDeleteAttribute={this.handleDeleteAttribute.bind(this)}
                                                    handleDeleteEnumeration={this.handleDeleteEnumeration.bind(this)}
                                                    category="5"/>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>


                        <div className="footer">

                            <FlatButton label="Add attribute" backgroundColor={lightBlue50}
                                        onClick={this.handleNewAttribute.bind(this)}/>
                        </div>

                    </div>


                    <div className="col-md-6">
                        <div className="well well-lg">
                            <AttributeOutput attributesList={this.props.attributesList}/>
                        </div>
                    </div>
                </div>


            </div>
        );

    }
}
;
export default Attribute;
