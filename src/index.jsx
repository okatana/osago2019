import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from './actions/';
import '../public/css/style.css';




import appReducer from "./reducers";
import App from "./components/App.jsx";
//import {subscribeCalculator} from "./components/App.jsx";

const composeEnhancers = composeWithDevTools({ actionCreators, trace: true, traceLimit: 25 });

let store = createStore(appReducer, composeEnhancers(applyMiddleware(invariant(), thunk)))
//subscribeCalculator(store)

store.subscribe(()=>{
    console.log('state changed:', store.getState())
})

//console.log('store  '+store.getState())
ReactDOM.render(<App store={store} />,
    document.getElementById('osagoContent')
)