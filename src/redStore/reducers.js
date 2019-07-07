import  {combineReducers } from 'redux';
import { homeReducer as home } from '../routes/Home/modules/homeAct';
import { trackReducer as track } from '../routes/Tracking/modules/trackAct';

const makeRootReducer = ()=>{
	return combineReducers({
		home,
		track
	});
};



export default makeRootReducer;