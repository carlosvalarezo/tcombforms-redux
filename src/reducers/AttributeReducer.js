import constants from '../constants/constants';

const INITIAL_STATE =
{
    attributesList: []
}

const AttributeReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case constants.CREATE_ATTRIBUTE:
            return {...state, attributesList: [...state.attributesList, action.payload]};
        case constants.CHANGE_ATTRIBUTE:
            return {
                ...state,
                attributesList: state.attributesList.map(attribute => attribute.id === action.id ?
                {...attribute, attributesList: action} :
                    attribute)
            };
        default:
            return state;
    }
}

export default AttributeReducer;