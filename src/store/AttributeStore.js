/**
 * Created by carlos-valarezo on 23/05/2017.
 */

import { createStore} from 'redux';
import AttributeReducer from '../reducers/AttributeReducer';

const AttributeStore = createStore(AttributeReducer);
export default AttributeStore;