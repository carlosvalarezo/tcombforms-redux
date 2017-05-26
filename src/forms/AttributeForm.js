import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ChipsContent from '../components/ChipsContent';
import Add from 'material-ui/svg-icons/content/add-circle';
import FlatButton from 'material-ui/FlatButton';
import {GridList} from 'material-ui/GridList';
import update from 'react-addons-update';
import t from 'tcomb-form';

var formatStruct = t.enums({
    none: 'None',
    number: 'Number',
    boolean: 'Boolean',
    dateTime: 'Date-Time',
    cdata: 'CDATA',
    uri: 'URI'
});

var dataTypeStruct = t.enums({
    string: 'String',
    object: 'Object'
});

const Positive = t.refinement(t.Number, (n) => {
    n >= 0
});

const FormSchema = t.struct({
    name: t.String,
    description: t.maybe(t.String),
    deviceResourceType: t.String,
    defaultValue: t.String,
    dataType: dataTypeStruct,
    format: formatStruct,
    enumerations: t.String
});

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        width: 500,
        height: 450,
        overflowY: 'auto'
    }
};

const Form = t.form.Form;

class AttributeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            value: ''
        };
    }

    componentDidMount() {
        this.setState({attribute: this.props.attribute});
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    }

    onChangeFormat = (event, index, value) => {
        this.setState({format: value});
        this.setState({expanded: value === 2})
    }

    onChangeDataType = (event, index, value) => {
        this.setState({dataType: value});

    }

    /*addEnumeration = () => {
     let enumerationList = this.state.attribute.enumerations;
     enumerationList.push(this.state.enumeration);
     this.setState({attribute: update(this.state.attribute, {enumerations: {$set: enumerationList}})});
     this.props.handleEditAttribute(this.state.attribute);
     }*/

    addEnumeration = () => {
        /*this.setState({value}, () => {
         this.props.attribute[path] = this.state.value[path];
         this.props.handleEditAttribute(this.props.attribute);
         });*/
        let enumerationList = this.props.attribute.enumerations;
        enumerationList.push(this.state.value['enumerations']);
        //this.setState({attribute: update(this.state.attribute, {enumerations: {$set: enumerationList}})});
        this.props.handleEditAttribute(enumerationList);
    }


    handleChangeTextBox = (value, path) => {
        (path != 'enumerations') ? (
            this.setState({value}, () => {
                this.props.attribute[path] = this.state.value[path];
                this.props.handleEditAttribute(this.props.attribute);
            })
        ) : (this.setState({value}))
    }

    handleDeleteAttribute = () => {
        this.props.handleDeleteAttribute(this.state.attribute);
    }

    render() {
        return (<div style={styles.root}>
            <GridList cols={3}>
                <div>
                    <Form ref="form" type={FormSchema} value={this.state.value}
                          onChange={this.handleChangeTextBox}/>
                </div>
                <FlatButton label="Delete attribute" backgroundColor={'lightyellow'}
                            onClick={this.handleDeleteAttribute.bind(this)}/>
                <FlatButton label="Add enumeration" backgroundColor={'lightgreen'}
                            onClick={this.addEnumeration.bind(this)}/>
            </GridList>
        </div>);
    }
}


export default AttributeForm;