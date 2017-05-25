import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardText} from 'material-ui/Card';
import t from 'tcomb-form';


const AttributeType = t.struct({
    name: t.String,
    description: t.String,
    defaultValue: t.String,
    dataType: t.String,
    format: t.String,
    rangeMin: t.Number,
    rangeMax: t.Number,
    unitsOfMeasurement: t.Number,
    precision: t.Number,
    accuracy: t.Number
});

const FormLayout = (locals) => {
    return (<div >

        <div>

            <TextField
                hintText="Name"
                floatingLabelText="Name"
                type="text" id="name"
            />

        </div>
        <div>
            <TextField
                hintText="Description"
                floatingLabelText="Description"
                type="text" id="description"
            />
        </div>
        <div>
            <SelectField floatingLabelText="Device Resource Type" value={1} disabled={true}>
                <MenuItem value={1} primaryText="DEFAULT VALUE"/>
            </SelectField>
        </div>
        <div>
            <SelectField floatingLabelText="Data Type" value={1}>
                <MenuItem value={1} primaryText="String"/>
                <MenuItem value={2} primaryText="Object"/>
            </SelectField>
        </div>
        <div>
            <SelectField floatingLabelText="Format" value={1}>
                <MenuItem value={1} primaryText="None"/>
                <MenuItem value={2} primaryText="Number"/>
                <MenuItem value={3} primaryText="Boolean"/>
                <MenuItem value={4} primaryText="Date-Time"/>
                <MenuItem value={5} primaryText="CDATA"/>
                <MenuItem value={6} primaryText="URI"/>
            </SelectField>
        </div>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
            <CardText expandable={true}>
                <div>
                    {locals.inputs.rangeMin}
                </div>
                <div>
                    {locals.inputs.rangeMax}
                </div>
                <div>
                    {locals.inputs.unitOfMeasurement}
                </div>
                <div>
                    {locals.inputs.precision}
                </div>
                <div>
                    {locals.inputs.accuracy}
                </div>
            </CardText>
        </Card>

    </div>)
}

const Form = t.form.Form;

const options = {
    template: FormLayout
};

class AttributeForm extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpand = () => {
        this.setState({expanded: true});
    };

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    render() {
        return (<div>
            <Form ref="form" type={AttributeType} options={options}/>
            <button >Delete attribute</button>
        </div>);
    }
}
;

export default AttributeForm;