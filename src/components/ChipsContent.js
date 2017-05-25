//This component will hold all the AttributeForm components that will be created with the button ADDCOMPONENT
import React, {Component} from 'react';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

//Create the attribute in the store and in the UI
class ChipsContent extends Component {

    render() {
        //console.log("chips ", this.props.chips);
        var chips = this.props.chips.enumerations.map((chip) => {
                return ( <div>
                    <Chip key={chip} style={styles}>{chip}</Chip>
                </div>);
            }
        );

        return <div>{chips}</div>;
    }
}
;
export default ChipsContent;

