import { combineReducers } from "redux";
import contractreducer from "./contractreducer";
import ownerreducer from "./ownerreducer";
const reducer = combineReducers({
    contractreducer : contractreducer,
    ownerreducer:ownerreducer,
})
export default reducer;