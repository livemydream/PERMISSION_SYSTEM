import {legacy_createStore} from "redux"
import reducer from './reducer.ts'
const score=legacy_createStore(reducer,window.__REDUX_DEVTOOLS_EXENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default score