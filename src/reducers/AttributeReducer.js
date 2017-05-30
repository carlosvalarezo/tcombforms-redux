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
            //console.log("new value ", action.payload);
            return {
                ...state, attributesList: state.attributesList.map(attribute => attribute.id === action.id ?
                {attribute, attributesList: action} : attribute)
            };
        case constants.DELETE_ATTRIBUTE:
            var index = state.attributesList.findIndex(() => {
                return state.attributesList.filter((a) => {
                    return a.id === action.payload.id
                })
            });
            return {
                ...state,
                attributesList: [
                    ...state.attributesList.slice(0, index),
                    ...state.attributesList.slice(index + 1)
                ]
            }
        case constants.DELETE_ENUMERATION:
            var indexEnum = state.attributesList[0].enumerations.indexOf(action.payload);
            return {
                ...state,
                attributesList: [
                    ...state.attributesList.slice(0, indexEnum),
                    {
                        ...state.attributesList[indexEnum],
                        enumerations: [
                            ...state.attributesList[indexEnum].enumerations.slice(0, indexEnum),
                            ...state.attributesList[indexEnum].enumerations.slice(indexEnum + 1),
                        ],
                    },
                    ...state.attributesList.slice(indexEnum + 1)],
            };
        default:
            return state;
    }
}

export default AttributeReducer;