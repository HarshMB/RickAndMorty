import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import reducers from '@redux';

export default configureStore = compose(applyMiddleware(thunk))(createStore)(reducers);