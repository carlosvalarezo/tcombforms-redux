import Attribute from '../components/Attribute';
import AttributeActions from '../actions/AttributeActions';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        attributesList: state.attributesList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateAttribute: () => dispatch(AttributeActions.createAttribute()),
        onChangeAttribute: (attribute) => dispatch(AttributeActions.changeAttribute(attribute))

    }
}

const AttributeContainer = connect(mapStateToProps, mapDispatchToProps)(Attribute);

export default AttributeContainer;