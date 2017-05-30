import React, {Component} from 'react';
import ChipsContent from '../components/ChipsContent';
import FlatButton from 'material-ui/FlatButton';
import {GridList} from 'material-ui/GridList';
import {Grid, Row, Col} from 'react-flexbox-grid';
import t from 'tcomb-form';
import t1 from 'tcomb';
import t2 from 'tcomb-validation';

const format = t1.enums({
    none: 'None',
    number: 'Number',
    boolean: 'Boolean',
    dateTime: 'Date-Time',
    cdata: 'CDATA',
    uri: 'URI'
});

const dataType = t1.enums({
    string: 'String',
    object: 'Object'
});

const attributeForm = t1.struct({
    name: t1.String,
    description: t1.String,
    deviceResourceType: t1.String,
    defaultValue: t1.String,
    dataType: dataType,
    format: format,
    enumerations: t1.String,
    rangeMin: t1.Number,
    rangeMax: t1.Number,
    unitsOfMeasurement: t1.String,
    precision: t1.Number,
    accuracy: t1.Number
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
    },
    showDiv: {
        height: 200
    },
    noShowDiv: {
        display: 'none'
    }
};

var maxMin = (x) => {
    console.log("===> ", x, " - ", !isNaN(x.rangeMax) );
    if (isNaN(x.rangeMax)) return false;
    return (Number(x.rangeMax) > Number(x.rangeMin));
};

var minMax = (x) => {
    console.log("yy ", x);
    return x.rangeMax > x.rangeMin;
};

var validateMaxMin = t2.refinement(t1.Any, maxMin);

var validateMinMax = t2.refinement(t1.Any, minMax);

validateMaxMin.getValidationErrorMessage = (v) => {
    if (isNaN(v.rangeMax)) return 'only numbers';
    return Number(v.rangeMin) > Number(v.rangeMax) ? 'min cant be gt max' : '';
}

const Form = t1.form.Form;

class AttributeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandNumber: false,
            expandEnumerations: true,
            disabled: false,
            value: {
                deviceResourceType: 'DEFAULT VALUE'
            },
            attribute: null,
            fields: {
                name: {
                    label: 'Name',
                    error: 'required',
                    attrs: {
                        autoFocus: true,
                        placeholder: 'NAME'
                    }
                },
                deviceResourceType: {
                    disabled: true,
                    nullOption: false,
                    label: 'Device resource type:'
                },
                defaultValue: {
                    label: 'Default value:',
                    disabled: false
                },
                dataType: {
                    nullOption: false,
                    label: 'Data Type',
                },
                format: {
                    nullOption: false,
                    disabled: false
                },
                enumerations: {
                    label: 'Enumerations',
                    error: 'required'
                },
                rangeMin: {
                    error: 'only numbers'
                },
                rangeMax: {
                    error: 'only numbers',
                    hasError: true,
                    required:true
                },
                unitOfMeasurement: {
                    error: 'required'
                },
                precision: {
                    error: 'only numbers'
                },
                accuracy: {
                    error: 'only numbers'
                }
            }
        };
    }

    componentDidMount() {
        this.setState({attribute: this.props.attribute});
    }

    addEnumeration = () => {
        let val = this.refs.form.getComponent('enumerations').validate();
        if (val.errors.length === 0) {
            let enumerationList = this.props.attribute.enumerations;
            enumerationList.push(this.state.value['enumerations']);
            this.props.handleEditAttribute(enumerationList);
            console.log(this.props.attribute.enumerations);
        }
    }

    handleChangeTextBox = (value, path) => {
        console.log("value ", value[path]);


        this.refs.form.getComponent(path).validate();
        if (path == 'rangeMax') {
            var result = t2.validate(value, validateMaxMin);
            if (result.errors.length > 0) {
                var fields = t.update(this.state.fields, {
                    rangeMax: {
                        error: {'$set': result.errors[0].message}
                    }
                });
                this.setState({fields: fields});
            }
            else
                {
                    var fields = t.update(this.state.fields, {
                        rangeMax: {
                            error: {'$set': ''}
                        }
                    });
                    this.setState({fields: fields});
                }
        }
        /*this.refs.form.getComponent(path).validate();
         var result = t2.validate(value, validateMaxMin);
         console.log("result ", result);
         if(result) this.setState({rangeError:result.errors[0].message});*/
        (path != 'enumerations') ? (
            this.setState({value}, () => {
                this.props.attribute[path] = this.state.value[path];
                this.props.handleEditAttribute(this.props.attribute);
                (this.props.attribute['dataType'] == 'string' && value['format'] == 'none')
                    ? this.setState({expandEnumerations: true})
                    : this.setState({expandEnumerations: true}),
                    (this.props.attribute['dataType'] == 'string' && value['format'] == 'number')
                        ? (this.setState({expandNumber: true}), this.setState({expandEnumerations: false}))
                        : this.setState({expandNumber: false}),
                    (this.props.attribute['dataType'] == 'object')
                        ? (this.setState({disabled: true}, () => {
                        this.setState({value})
                    }), this.setState({expandEnumerations: false}), this.setState({expandNumber: false}))
                        : this.setState({disabled: false})


            })
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
            template: formLayout,
            fields: this.state.fields
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