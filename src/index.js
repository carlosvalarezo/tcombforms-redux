import React from 'react';
import ReactDOM from 'react-dom';
import AttributeStore from './store/AttributeStore'
import AttributeContainer from './components/AttributeContainer';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

injectTapEventPlugin();
ReactDOM.render(<MuiThemeProvider><Provider store={AttributeStore}><AttributeContainer /></Provider>
</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();

