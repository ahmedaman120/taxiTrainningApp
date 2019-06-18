import update from 'react-addons-update';
import constants  from './ActConst';
import { Dimensions } from "react-native";	
//---------------------------
//-----------constants-------
//---------------------------
const {GET_CURR_LOCATION} = constants;
const { width,height }= Dimensions.get("window");

let ASPECT_RATION= width/height;
const LATDELTA= 0.0922;
const LONGDELTA=ASPECT_RATION=LATDELTA;

//---------------------------
//----------Actions----------
//---------------------------
export function getCurrLocation(){
	return(dispatch)=>{
		navigator.geolocation.getCurrentPosition((postion)=>{
			dispatch({
				type:GET_CURR_LOCATION,
				payload:postion
			});
		},
		(error)=>console.log(error)
		,
		{enableHighAccuracy:true,timeout:20000,maximumAge:1000}
		);
	}
}


//---------------------------
//-----------Handlers--------
//---------------------------


function handleGetCurrLocation(state,action){
	return update(state,
		{region:{
				latitude:{$set:Number(action.payload.coords.latitude)},
				longitude:{$set:Number(action.payload.coords.longitude)},
				latitudeDelta:{$set:LATDELTA},
				longitudeDelta:{$set:LONGDELTA}
			}
	     }
	);
}


const ACTION_HANDLERS = {
	GET_CURR_LOCATION:handleGetCurrLocation
};
const initialState = {
	region:{}
};

export function homeReducer(state = initialState,action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state,action) : state;
} 