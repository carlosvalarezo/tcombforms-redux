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
import {Grid, Row, Col} from 'react-flexbox-grid';
import t from 'tcomb-form';

const format = t.enums({
    none: 'None',
    number: 'Number',
    boolean: 'Boolean',
    dateTime: 'Date-Time',
    cdata: 'CDATA',
    uri: 'URI'
});

const dataType = t.enums({
    string: 'String',
    object: 'Object'
});

const attributeForm = t.struct({
    name: t.String,
    description: t.String,
    deviceResourceType: t.String,
    defaultValue: t.String,
    dataType: dataType,
    format: format,
    enumerations: t.String,
    rangeMin: t.Number,
    rangeMax: t.Number,
    unitsOfMeasurement: t.String,
    precision: t.Number,
    accuracy: t.Number
});

const Positive = t.refinement(t.Number, (n) => {
    n >= 0
});

//en options se puede poner la estructura que aparezca cuando se hace click en un de los items


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
    },
    showDiv: {
        height: 200
    },
    noShowDiv: {
        display: 'none'
    }
};

const Form = t.form.Form;

class AttributeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandNumber: false,
            expandEnumerations: false,
            value: null
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
        let enumerationList = this.props.attribute.enumerations;
        enumerationList.push(this.state.value['enumerations']);
        this.props.handleEditAttribute(enumerationList);
        console.log(this.props.attribute.enumerations);
    }


    handleChangeTextBox = (value, path) => {
        (path != 'enumerations') ? (
            this.setState({value}, () => {
                this.props.attribute[path] = this.state.value[path];
                this.props.handleEditAttribute(this.props.attribute);
            }), (this.props.attribute['dataType'] == 'string' && value['format'] == 'none')
                ? this.setState({expandEnumerations: true})
                : this.setState({expandEnumerations: false}),
                (this.props.attribute['dataType'] == 'string' && value['format'] == 'number')
                    ? this.setState({expandNumber:true})
                    : this.setState({expandNumber:false})

        ) : (this.setState({value}));
    }

    handleDeleteAttribute = () => {
        this.props.handleDeleteAttribute(this.state.attribute);
    }

    render() {
        const formLayout = (locals) => {
            return (
                <div>

                    <div>{locals.inputs.name}</div>
                    <div>{locals.inputs.description}</div>
                    <div>{locals.inputs.deviceResourceType}</div>
                    <div>{locals.inputs.defaultValue}</div>
                    <div>{locals.inputs.dataType}</div>
                    <div>{locals.inputs.format}</div>
                    <div
                        style={this.state.expandEnumerations ? styles.showDiv : styles.noShowDiv}>
                        <div>{locals.inputs.enumerations}</div>
                        <FlatButton label="Add enumeration" backgroundColor={'lightgreen'}
                                    onClick={this.addEnumeration.bind(this)}/>
                        <ChipsContent chips={this.props.attribute.enumerations}
                                      handleDeleteEnumeration={this.props.handleDeleteEnumeration}/>
                    </div>
                    <div style={this.state.expandNumber ? styles.showDiv : styles.noShowDiv}>
                        <div>{locals.inputs.rangeMin}</div>
                        <div>{locals.inputs.rangeMax}</div>
                        <div>{locals.inputs.unitOfMeasurement}</div>
                        <div>{locals.inputs.precision}</div>
                        <div>{locals.inputs.accuracy}</div>
                    </div>

                </div>
            );
        };
        const options = {
            template: formLayout
        };
        return (<div style={styles.root}>
            <GridList cols={3}>
                <div>
                    <Form ref="form" type={attributeForm} options={options} value={this.state.value}
                          onChange={this.handleChangeTextBox}/>

                </div>
                <FlatButton label="Delete attribute" backgroundColor={'lightyellow'}
                            onClick={this.handleDeleteAttribute.bind(this)}/>

            </GridList>
        </div>);
    }
}


export default AttributeForm;