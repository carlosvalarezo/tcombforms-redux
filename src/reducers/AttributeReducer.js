import constants from '../constants/constants';
import _ from 'lodash';

const INITIAL_STATE =
{
    attributesList:[]
}

const AttributeReducer = (state = INITIAL_STATE, action ={}) =>
{
    let index;
    switch(action.type)
    {
        case constants.CREATE_ATTRIBUTE:
            return { ...state, attributesList: [...state.attributesList, action.payload] };
        case constants.CHANGE_ATTRIBUTE:
            index = _.findIndex(...state.attributesList, { id: action.payload.id });
            return {
                ...state,
                attributesList: [
                    ...state.attributesList.slice(0, index),
                    {
                        ...state.attributesList[index],
                        [action.payload.field]: action.payload.value,
                    },
                    ...state.attributesList.slice(index + 1)],
            };
        default: return state;
    }
}

export default AttributeReducer;