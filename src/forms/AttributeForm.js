import React, {Component} from 'react';
import ChipsContent from '../components/ChipsContent';
import FlatButton from 'material-ui/FlatButton';
import {blue500, red500, greenA200, yellow900} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import t from 'tcomb-form';
import t1 from 'tcomb';
import t2 from 'tcomb-validation';

const styles1 = {
    display: 'flex'
};

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
        display: 'block'
    },
    noShowDiv: {
        display: 'block'
    },
    button: {
        paddingTop: 25,
        paddingLeft: -10
    }
};

var maxMin = (x) => {
    return (Number(x.rangeMax) > Number(x.rangeMin));
};

var minMax = (x) => {
    return (Number(x.rangeMax) > Number(x.rangeMin));
};

var nameOK = (x) => {
    console.log("nameOK = ", x);
    return !x;

}

var precision = (x) => {
    let range = Number(x.rangeMax) - Number(x.rangeMin);
    return (Number(range) % Number(x.precision)) === 0;
}

var validateMaxMin = t2.refinement(t1.Any, maxMin);

var validateMinMax = t2.refinement(t1.Any, minMax);

var validatePrecision = t2.refinement(t1.Any, precision);

var validateName = t2.refinement(t1.Boolean, nameOK);

validatePrecision.getValidationErrorMessage = (v) => {
    if (isNaN(v.precision)) return 'Enter only numbers';
    return (Number(v.precision) < Number(v.rangeMin) || Number(v.precision) > Number(v.rangeMax)) ? 'Precision must be between max & min' : '';
}

validateMaxMin.getValidationErrorMessage = (v) => {
    if (isNaN(v.rangeMax)) return 'Enter only numbers';
    return Number(v.rangeMin) > Number(v.rangeMax) ? 'Min cannot be grater than max' : '';
}

validateMinMax.getValidationErrorMessage = (v) => {
    if (isNaN(v.rangeMin)) return 'Enter only numbers';
    return Number(v.rangeMin) > Number(v.rangeMax) ? 'Min cannot be grater than max' : '';
}

validateName.getValidationErrorMessage = (v) => {
    return v ? 'Name is already in the list' : '';
}

const Form = t1.form.Form;

class AttributeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attribute: null,
            expandNumber: false,
            expandEnumerations: true,
            disabled: false,
            value: {deviceResourceType: 'DEFAULT VALUE', format: 'none', dataType: 'string'},
            fields: {
                name: {
                    label: 'Name',
                    error: '',
                    hasError: true,
                    attrs: {
                        autoFocus: true,
                        placeholder: 'Name'
                    }
                },
                deviceResourceType: {
                    disabled: true,
                    nullOption: false,
                    label: 'Device resource type:'
                },
                defaultValue: {
                    label: 'Default value:',
                    disabled: false,
                    attrs: {
                        placeholder: 'Insert default value'
                    }
                },
                dataType: {
                    nullOption: false,
                    label: 'Data Type',
                },
                format: {
                    nullOption: false,
                    disabled: false,
                },
                enumerations: {
                    label: 'Enumerations',
                    error: 'required',
                    attrs: {
                        placeholder: 'Enter value'
                    }
                },
                rangeMin: {
                    error: '',
                    hasError: true,
                    required: true,
                    attrs: {
                        placeholder: 'Range min'
                    }
                },
                rangeMax: {
                    error: '',
                    hasError: true,
                    required: true,
                    attrs: {
                        placeholder: 'Range max'
                    }
                },
                unitOfMeasurement: {
                    error: 'required',
                    hasError: true,
                    required: true,
                    attrs: {
                        placeholder: 'UoM (eg. mm)'
                    }
                },
                precision: {
                    error: '',
                    hasError: true,
                    attrs: {
                        placeholder: 'Precision (eg. 0.5)'
                    }
                },
                accuracy: {
                    error: '',
                    hasError: true,
                    attrs: {
                        placeholder: 'Accuracy (eg. 0.5)'
                    }
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

        this.refs.form.getComponent(path).validate();
        let result;
        let fields;
        if (path == 'name') {
            result = t2.validate(this.props.handleName(value[path]), validateName);
            if (result.errors.length > 0) {
                fields = t.update(this.state.fields, {
                    name: {
                        error: {'$set': result.errors[0].message}
                    }
                });
                this.setState({fields: fields});
                this.props.handleButtonState(true);
            }
            else {
                fields = t.update(this.state.fields, {
                    name: {
                        error: {'$set': ''}
                    }
                });
                this.setState({fields: fields});
                this.props.handleButtonState(false);
            }
        }
        if (path == 'rangeMax') {
            result = t2.validate(value, validateMaxMin);
            if (result.errors.length > 0) {
                fields = t.update(this.state.fields, {
                    rangeMax: {
                        error: {'$set': result.errors[0].message}
                    }
                });
                this.setState({fields: fields});
                this.props.handleButtonState(true);
            }
            else {
                fields = t.update(this.state.fields, {
                    rangeMax: {
                        error: {'$set': ''}
                    }
                });
                this.setState({fields: fields});
                this.props.handleButtonState(false);
            }
        }

        if (path == 'rangeMin') {
            result = t2.validate(value, validateMinMax);
            if (result.errors.length > 0) {
                fields = t.update(this.state.fields, {
                    rangeMin: {
                        error: {'$set': result.errors[0].message}
                    }
                });
                this.setState({fields: fields});
                this.props.handleButtonState(true);
            }
            else {
                fields = t.update(this.state.fields, {
                    rangeMin: {
                        error: {'$set': ''}
                    }
                });
                this.setState({fields: fields});
                this.props.handleButtonState(false);
            }
        }

        if (path == 'precision') {
            result = t2.validate(value, validatePrecision);
            if (result.errors.length > 0) {
                fields = t.update(this.state.fields, {
                    precision: {
                        error: {'$set': result.errors[0].message}
                    }
                });
                this.setState({fields: fields});
                this.props.handleButtonState(true);
            }
            else {
                fields = t.update(this.state.fields, {
                    precision: {
                        error: {'$set': ''}
                    }
                });
                this.setState({fields: fields});
                this.props.handleButtonState(false);
            }

        }

        if (path == 'dataType') {

            if (value['dataType'] == 'string') {
                fields = t.update(this.state.fields, {
                    defaultValue: {disabled: {'$set': false}},
                    format: {disabled: {'$set': false}}
                });
                this.setState({fields: fields});
                if (value['format'] == 'none') {
                    this.setState({expandEnumerations: true});
                    this.setState({expandNumber: false});
                }
                else if (value['format'] == 'number') {
                    this.setState({expandEnumerations: false});
                    this.setState({expandNumber: true});
                }
            }

            else if (value['dataType'] == 'object') {

                fields = t.update(this.state.fields, {
                    defaultValue: {disabled: {'$set': true}},
                    format: {disabled: {'$set': true}}
                });
                this.setState({expandEnumerations: false});
                this.setState({expandNumber: false});
                this.setState({fields: fields});
            }
        }

        if (path == 'format') {
            if (value['dataType'] == 'string') {
                fields = t.update(this.state.fields, {
                    defaultValue: {disabled: {'$set': false}},
                    format: {disabled: {'$set': false}}
                });
                this.setState({fields: fields});
                if (value['format'] == 'number') {
                    this.setState({expandEnumerations: false});
                    this.setState({expandNumber: true});
                } else if (value['format'] == 'none') {
                    this.setState({expandEnumerations: true});
                    this.setState({expandNumber: false});
                }
            }
        }

        (path != 'enumerations') ? (
            this.setState({value}, () => {
                this.props.attribute[path] = this.state.value[path];
                this.props.handleEditAttribute(this.props.attribute);


            })
        ) : (this.setState({value}));


    }

    handleDeleteAttribute = () => {
        this.props.handleDeleteAttribute(this.state.attribute);
    }

    render() {
        const formLayout = (locals) => {
            return (
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div style={{display: 'flex'}}>
                            <div className="panel-title">{this.props.attribute.id}</div>
                            <div style={{textAlign: 'right', margin: '0 auto'}}>
                                <FlatButton label="Delete attribute" backgroundColor={'lightyellow'}
                                            onClick={this.handleDeleteAttribute.bind(this)}/>
                            </div>
                        </div>

                    </div>
                    <div className="panel-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-2">
                                    <div>{locals.inputs.name}</div>
                                </div>
                                <div className="col-md-4">
                                    <div>{locals.inputs.description}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div>{locals.inputs.deviceResourceType}</div>
                                    <div>{locals.inputs.defaultValue}</div>
                                </div>
                                <div className="col-md-3">
                                    <div>{locals.inputs.dataType}</div>
                                    <div>{locals.inputs.format}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    style={this.state.expandEnumerations ? {display: 'inline'} : {display: 'none'}}>

                                    <div className="col-md-5">
                                        <div className="input-group">
                                            <div>
                                                <div >{locals.inputs.enumerations}</div>
                                            </div>
                                            <div className="input-group-btn" style={styles.button}>

                                                <FlatButton label="Add enumeration" backgroundColor={'lightgreen'}
                                                            onClick={this.addEnumeration.bind(this)}/>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <ChipsContent chips={this.props.attribute.enumerations}
                                                      handleDeleteEnumeration={this.props.handleDeleteEnumeration}/>
                                    </div>
                                </div>
                            </div>


                            <div style={this.state.expandNumber ? {display: 'inline'} : {display: 'none'}}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <div>{locals.inputs.rangeMin}</div>
                                    </div>
                                    <div className="col-md-2">
                                        <div>{locals.inputs.rangeMax}</div>
                                    </div>
                                    <div className="col-md-2">
                                        <div>{locals.inputs.unitsOfMeasurement}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div>{locals.inputs.precision}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <div>{locals.inputs.accuracy}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
                ;
        };
        const options = {
            template: formLayout,
            fields: this.state.fields
        };

        return (


            <Form ref="form" type={attributeForm} options={options} value={this.state.value}
                  onChange={this.handleChangeTextBox}/>



        );
    }
}


export default AttributeForm;
