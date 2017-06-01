//This component will hold all the AttributeForm components that will be created with the button ADDCOMPONENT
import React, {Component} from 'react';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
};
class ChipsContent extends Component {

    deleteEnumeration = (chip) => {
        this.props.handleDeleteEnumeration(chip)
    }

    render() {
        var chips = this.props.chips.map((chip) => {
                return ( <div key={chip}>
                    <Chip key={chip}
                          style={styles}
                          onRequestDelete={() => this.deleteEnumeration(chip)}>
                        {chip}
                    </Chip>
                </div>);
            }
        );

        return <div>{chips}</div>;
    }
}
;
export default ChipsContent;

