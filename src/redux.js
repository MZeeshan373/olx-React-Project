import { createStore,combineReducers} from 'redux';
import userReducer from './reducer/user'
import searchReducer from './reducer/searchReducer'
// import userreducer from'./reducer/userreducer'
import adsReducer from './reducer/adsReducer'

let allreducer = combineReducers({userReducer,adsReducer,searchReducer});
let store = createStore(allreducer);

export default store;