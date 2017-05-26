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
        onCreateAttribute: (category) => dispatch(AttributeActions.createAttribute(category)),
        onChangeAttribute: (attribute) => dispatch(AttributeActions.changeAttribute(attribute)),
        onDeleteAttribute: (attribute) => dispatch(AttributeActions.deleteAttribute(attribute)),
        onDeleteEnumeration:(enumeration) => dispatch(AttributeActions.deleteEnumeration(enumeration))

    }
}

const AttributeContainer = connect(mapStateToProps, mapDispatchToProps)(Attribute);

export default AttributeContainer;