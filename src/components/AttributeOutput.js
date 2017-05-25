//This component will be used to render the output in JSON
import React, {Component} from 'react';

//Create the attribute in the store and in the UI
class AttributeOutput extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            attributesList:[]
        }
    }
    componentDidMount()
    {
        this.setState({attributesList:this.props.attributesList});
    }
    componentWillReceiveProps()
    {
        this.setState({attributesList:this.props.attributesList} );

    }
    render() {
        return <div>{JSON.stringify(this.state.attributesList)}</div>

    }
};
export default AttributeOutput;