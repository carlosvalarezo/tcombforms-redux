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
                attributesList: state.attributesList.map(attribute =>
                    attribute.id === action.id
                        ?
                    {attribute, attributesList: action}
                        : attribute)
            };
        case constants.DELETE_ATTRIBUTE:
            let index = state.attributesList.findIndex((attribute) => {
                return attribute.id === action.payload.id;
            })
            return {
                ...state,
                attributesList: [
                    ...state.attributesList.slice(0, index),
                    ...state.attributesList.slice(index + 1)
                ]
            }
        case constants.DELETE_ENUMERATION:
            let indexArray = state.attributesList.findIndex((attribute) => {
                return attribute.id === action.payload.id;
            });

            let result = {
                ...state.attributesList[indexArray],
                enumerations: (
                    state.attributesList.map(attribute =>
                        attribute.id === action.payload.id ? (attribute.enumerations.filter((enumeration) => {
                            return enumeration !== action.payload.enumeration
                        })) : attribute).toString().split(","))
            }
            console.log("FINAL ", result);
            return result;
        default:
            return state;
    }
}

export default AttributeReducer;