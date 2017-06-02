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
        let index = this.props.attribute.enumerations.indexOf(chip);
        this.props.attribute.enumerations = this.props.attribute.enumerations.slice(0, index).concat(this.props.attribute.enumerations.slice(index + 1));
        console.log("uE ", this.props.attribute.enumerations);
        this.props.handleDeleteEnumeration(this.props.attribute)
    }

    render() {
        var chips = this.props.attribute.enumerations.map((chip) => {
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

