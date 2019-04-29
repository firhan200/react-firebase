import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(rootReducer, compose(applyMiddleware(thunk)
    // , window.devToolsExtension ? window.devToolsExtension() : f => f
));