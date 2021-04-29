import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './state/store/store';
import InitializeSideEffects from './sideEffects/InitializeSideEffects';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import loadScript from './utils/loadScript';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { ThemeProvider, createMuiTheme, StylesProvider, jssPreset } from '@material-ui/core/styles';

// loadScript('google-places-api-script', `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_KEY}&libraries=places`);

//Register all side effects
InitializeSideEffects();

const dir = 'rtl';
let theme;
const plugins = [...jssPreset().plugins];
document.body.dir = dir || '';
theme = createMuiTheme({
    direction: dir
});
if (dir === 'rtl') {
    plugins.push(rtl());
}
const jss = create({ plugins });

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
            <Provider store={store}>
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <App />
                </MuiPickersUtilsProvider>
            </Provider>
        </StylesProvider>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
