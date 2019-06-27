import update from 'react-addons-update';
import constants  from './ActConst';
import { Dimensions } from "react-native";	
import RNGooglePlaces  from 'react-native-google-places';
import { formatTestResults } from '@jest/test-result';
//---------------------------
//-----------constants-------
//---------------------------
const {
	GET_CURR_LOCATION, 
	GET_INPUT,
	CHANGE_BETWEEN_BE_AND_WILL,
	GET_PLACES_FROM_GOOGLE,
	GET_SELECTED_ADDRESS,
	GET_DISTANCE,
	GET_FARE
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
			.getAutocompletePredictions(userInput,{country:"EG"})
			.then((results)=>dispatch({
				type:GET_PLACES_FROM_GOOGLE,
				payload:results
			}))
			.catch((err)=>{console.log(err);console.log(store().home.InputData.be  )});
	}
}


//GET SELECTED ADDRESS 
export function getSelectedAddress(payload){
	return(dispatch,store)=>{
		RNGooglePlaces.lookUpPlaceByID(payload)
			.then((results)=>{
				dispatch({
					type:GET_SELECTED_ADDRESS,
					payload:results
				});
			})
			.then(()=>{
				//get distance between two places
				if(store().home.selectedAddress.will && store().home.selectedAddress.be){
					let latBe =store().home.selectedAddress.be.location.latitude+","+store().home.selectedAddress.be.location.longitude;
					let latWill =store().home.selectedAddress.will.location.latitude+","+store().home.selectedAddress.will.location.longitude;
					let url = "https://maps.googleapis.com/maps/api/distancematrix/json";
					let params = {
						origins:latBe,
						destinations:latWill,
						mode:"driving",
						key:"AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
					};
					// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
					console.log(">>>>>>>>>>>>>>",url+`?origins=${latBe}&destinations=${latWill}&mode=${params.mode}&key=${params.key}`);
					fetch(url+`?origins=${latBe}&destinations=${latWill}&mode=${params.mode}&key=${params.key}`)
						.then((result)=>result.json())		
						.then((result)=>{
								console.log(result);
								dispatch({
									type:GET_DISTANCE,
									payload:result.rows[0].elements
								});
								return result.rows[0].elements;
						})
						.then((distanceObj)=>{
							let fare = distanceObj[0].distance.value * 0.005;
							let timeCost = distanceObj[0].duration.value;
							let returnObj = {
								fare:fare ,
								timeCost:timeCost
							};
							dispatch ({
								type:GET_FARE,
								payload:returnObj
							});
						});
				}
			})
			.catch((err)=>{console.log(err);});
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

function handleGetSelectedAddress(state,action){
	let Title= state.resultTypes.be ? "be" : "will";
	return update(state,{
		selectedAddress:{
			[Title]:{
				$set:action.payload
			}
		},
		resultTypes:{
			will:{$set:false},
			be:{$set:false}
		}
	});
}

function handleGetDistance(state, action){
	return update(state,{
		distance:{
			$set:action.payload
		}
	})
}

function handleGetFare(state, action){
	return update(state,{
		fare:{
			$set:action.payload
		}
	})
}


const ACTION_HANDLERS = {
	GET_CURR_LOCATION:handleGetCurrLocation,
	GET_INPUT:handleGetInput,
	CHANGE_BETWEEN_BE_AND_WILL:handleChangeBetweenBeAndWill,
	GET_PLACES_FROM_GOOGLE:handleGetPlacesFromGoogle,
	GET_SELECTED_ADDRESS:handleGetSelectedAddress,
	GET_DISTANCE:handleGetDistance,
	GET_FARE:handleGetFare
};
const initialState = {
	region:{},
	InputData:{},
	resultTypes:{},
	predictions:{},
	selectedAddress:{},
	distance:{},
	fare:{}
};

export function homeReducer(state = initialState,action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state,action) : state;
} 