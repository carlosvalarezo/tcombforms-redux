//This component will hold all the AttributeForm components that will be created with the button ADDCOMPONENT
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
        console.log("HI ", this.state.attributesList);
        return <div>{JSON.stringify(this.state.attributesList)}</div>

    }
};
export default AttributeOutput;