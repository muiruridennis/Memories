import{combineReducers} from "redux";
import posts from "./posts";
import authReducer from "./Auth";


export const reducers= combineReducers({posts, authReducer})