//This component will hold the 4 tabs and the button ADD ATTRIBUTE
import React from 'react';
import TabContent from './TabContent';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

class TabContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };



    render() {
        return(

        );
    }
}

export default TabContainer;