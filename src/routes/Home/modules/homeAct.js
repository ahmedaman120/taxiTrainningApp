import update from 'react-addons-update';
import constants  from './ActConst';
import { Dimensions } from "react-native";	
import RNGooglePlaces  from 'react-native-google-places';
//---------------------------
//-----------constants-------
//---------------------------
const {
	GET_CURR_LOCATION, 
	GET_INPUT,
	CHANGE_BETWEEN_BE_AND_WILL,
	GET_PLACES_FROM_GOOGLE
	} = constants;


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
		{ enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
		);
	}
}


//HANDLE USER INPUTS FROM SEARCH BOXES-->
export function getInput(payload){
	return {
		type:GET_INPUT,
		payload
	}
}

//changeBetweenBeAndWill search boxes 
export function changeBetweenBeAndWill(payload){
	return {
		type:CHANGE_BETWEEN_BE_AND_WILL,
		payload
	}
}


//GET PERIDICTION  PLACES FORM GOOGLE PLACES ACTION 
export function getPlacesFromGoogle(){
	return(dispatch, store)=>{
		let userInput = store().home.resultTypes.be ? store().home.InputData.be  : store().home.InputData.will ;
		RNGooglePlaces
			.getAutocompletePredictions(userInput,{country:"MY"})
			.then((results)=>dispatch({
				type:GET_PLACES_FROM_GOOGLE,
				payload:results
			}))
			.catch((err)=>{console.log(err);console.log(store().home.InputData.be  )});
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

//HANDLER USER INPUTS FROM SEARCH BOXES-->
function handleGetInput(state,action){
	const  {key , value }= action.payload;
	return update(state,{
			InputData:{
				[key]:{
					$set:value
				}
			}
		}
	);
}
function handleChangeBetweenBeAndWill(state,action){
	if(action.payload=="be"){
		return update(state,{
			resultTypes:{
				be:{$set:true},
				will:{$set:false}
			},
			predictions:{$set:{}}
		});
	}
	if(action.payload=="will"){
		return update(state,{
			resultTypes:{
				be:{$set:false},
				will:{$set:true}
			},
			predictions:{$set:{}}
		});
	}
}


function handleGetPlacesFromGoogle(state,action){
	return update(state,{
		predictions:{
			$set:action.payload
		}
	})
}

const ACTION_HANDLERS = {
	GET_CURR_LOCATION:handleGetCurrLocation,
	GET_INPUT:handleGetInput,
	CHANGE_BETWEEN_BE_AND_WILL:handleChangeBetweenBeAndWill,
	GET_PLACES_FROM_GOOGLE:handleGetPlacesFromGoogle
};
const initialState = {
	region:{},
	InputData:{},
	resultTypes:{},
	predictions:{}
};

export function homeReducer(state = initialState,action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state,action) : state;
} 