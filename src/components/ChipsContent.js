//This component will hold all the AttributeForm components that will be created with the button ADDCOMPONENT
import React, {Component} from 'react';
import Chip from 'material-ui/Chip';

//Create the attribute in the store and in the UI
class TabContent extends Component {

    render() {
        console.log("chips ", this.props.chips);
        /*var chips = this.props.chips.map((chip) => {
                return ( <div>
                    <Chip key= {chip} >chip</Chip>
                </div>);
            }
        );

        return <div>{chips}</div>;*/
        return <div></div>
    }
}
;
export default TabContent;

