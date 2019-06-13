import  {combineReducers } from 'redux';
import { homeReducer as home } from '../routes/Home/modules/homeAct'

const makeRootReducer = ()=>{
	return combineReducers({
		home
	});
};



export default makeRootReducer;