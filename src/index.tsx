import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './state/store/store';
import InitializeSideEffects from './sideEffects/InitializeSideEffects';
import { ThemeProvider } from 'styled-components';
import theme from './components/shared/Theme/theme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import loadScript from './utils/loadScript';

// loadScript('google-places-api-script', `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_KEY}&libraries=places`);

//Register all side effects
InitializeSideEffects();
ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <App />
                </MuiPickersUtilsProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
