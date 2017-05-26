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

class AttributeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            enumeration: '',
            attribute: {},
            format: '',
            dataType:''

        };
    }

    componentDidMount() {
        this.setState({attribute: this.props.attribute});
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    }

    onChangeFormat = (event, index, value) => {
        this.setState({format:value});
        this.setState({expanded: value === 2})
    }

    onChangeDataType = (event, index, value) => {
        this.setState({dataType:value});

    }

    addEnumeration = () => {
        let enumerationList = this.state.attribute.enumerations;
        enumerationList.push(this.state.enumeration);
        this.setState({attribute: update(this.state.attribute, {enumerations: {$set: enumerationList}})});
        this.props.handleEditAttribute(this.state.attribute);
    }

    handleChangeTextBox = (event) => {
        let value = event.target.value;
        let uiControl = event.target.id;
        let attribute = this.props.attribute;
        uiControl !== 'enumerations' ? attribute[uiControl] = value : this.setState({enumeration: value});
        this.props.handleEditAttribute(attribute);
    }

    handleDeleteAttribute = () => {
        this.props.handleDeleteAttribute(this.state.attribute);
    }

    render() {
        return (<div style={styles.root}>
            <GridList cols={3}>
                <div>
                    <TextField
                        hintText="Name"
                        floatingLabelText="Name"
                        type="text" id="name" onChange={this.handleChangeTextBox.bind(this)}
                    />
                </div>

                <div>
                    <TextField
                        hintText="Description"
                        floatingLabelText="Description"
                        type="text" id="description" onChange={this.handleChangeTextBox.bind(this)}
                    />
                </div>

                <div>
                    <SelectField floatingLabelText="Device Resource Type" value={1} disabled={true}>
                        <MenuItem value={1} primaryText="DEFAULT VALUE" id="default-value"/>
                    </SelectField>
                </div>

                <div>
                    <SelectField floatingLabelText="Data Type" value={1} id="data-type"
                                 >
                        <MenuItem value={1} primaryText="String"/>
                        <MenuItem value={2} primaryText="Object"/>
                    </SelectField>
                </div>

                <div>
                    <SelectField floatingLabelText="Format" value={1}
                                 >
                        <MenuItem value={1} primaryText="None"/>
                        <MenuItem value={2} primaryText="Number"/>
                        <MenuItem value={3} primaryText="Boolean"/>
                        <MenuItem value={4} primaryText="Date-Time"/>
                        <MenuItem value={5} primaryText="CDATA"/>
                        <MenuItem value={6} primaryText="URI"/>
                    </SelectField>
                </div>

                <div>
                    <TextField
                        hintText="Enumerations"
                        floatingLabelText="Enumerations"
                        type="text" id="enumerations" onChange={this.handleChangeTextBox.bind(this)}
                    /><IconButton tooltip="Add Enumerations" onTouchTap={this.addEnumeration.bind(this)}>
                    <Add/>
                </IconButton>
                    <ChipsContent chips={this.props.attribute}
                                  handleDeleteEnumeration={this.props.handleDeleteEnumeration}/>
                </div>
                <Card>
                    <CardText expandable={this.state.expanded}>

                        <div>
                            <TextField
                                hintText="Range min"
                                floatingLabelText="Range min"
                                type="text" id="range-min"
                            />
                        </div>

                        <div>
                            <TextField
                                hintText="Range max"
                                floatingLabelText="Range max"
                                type="text" id="range-max"
                            />
                        </div>

                        <div>
                            <TextField
                                hintText="Range max"
                                floatingLabelText="Range max"
                                type="text" id="range-max"
                            />
                        </div>

                        <div>
                            <TextField
                                hintText="Precision"
                                floatingLabelText="Precision"
                                type="text" id="precision"
                            />
                        </div>
                        <div>
                            <TextField
                                hintText="Accuracy"
                                floatingLabelText="Accuracy"
                                type="text" id="accuracy"
                            />
                        </div>

                    </CardText>
                </Card>
                <FlatButton label="Delete attribute" backgroundColor={'lightyellow'}
                            onClick={this.handleDeleteAttribute.bind(this)}/>
            </GridList>
        </div>);
    }
}


export default AttributeForm;