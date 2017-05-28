//This component will be used to render the output in JSON
import React, {Component} from 'react';

//Create the attribute in the store and in the UI
class AttributeOutput extends Component {
    constructor(props) {
        super(props);
        this.state = {attributesList: []}
    }

    componentWillReceiveProps() {
        this.setState({attributesList: this.props.attributesList});
    }

    render() {
        return <div style={{"width": "100%"}}>LIVE JSON Output<br/>
            <code>{JSON.stringify(this.props.attributesList, null, 1)}</code></div>

    }
}
;
export default AttributeOutput;