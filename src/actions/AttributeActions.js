import constants from '../constants/constants';
import uuidV4 from 'uuid/v4';

const AttributeActions = {

    createAttribute()
    {
        const ATTRIBUTE = {
            id: uuidV4(),
            category: 0,
            name: '',
            description: '',
            deviceResourceType: 'DEFAULT VALUE',
            defaultValue: '',
            dataType: 'string',
            format: 'none',
            rangeMin: 0,
            rangeMax: 0,
            unitOfMeasurement: 0,
            precision: 0,
            accuracy: 0,
            enumerations:[]
        };
        return{
            type: constants.CREATE_ATTRIBUTE,
            payload: ATTRIBUTE
        }
    },

    changeAttribute(attribute)
    {
        return{
            type:constants.CHANGE_ATTRIBUTE,
            payload:attribute
        }
    }
};

export default AttributeActions;