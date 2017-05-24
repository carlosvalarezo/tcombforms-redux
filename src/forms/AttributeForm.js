import React, {Component} from 'react';
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
    return (<div>
        <div>
            {locals.inputs.name}
        </div>
        <div>
            {locals.inputs.description}
        </div>
        <div>
            {locals.inputs.defaultValue}
        </div>
        <div>
            {locals.inputs.dataType}
        </div>
        <div>
            {locals.inputs.format}
        </div>
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
    </div>)
}

const Form = t.form.Form;

const options = {
    template: FormLayout
};

class AttributeForm extends Component {
    render() {
        return (<div>
                <Form ref="form" type={AttributeType} options={options}/>
                <button >Delete attribute </button>
                </div>);
    }
};

export default AttributeForm;