import update from 'react-addons-update';
import constants  from './ActConst';
import { Dimensions } from "react-native";	
import RNGooglePlaces  from 'react-native-google-places';
// import {axios} from 'axios;'
import { formatTestResults } from '@jest/test-result';
import Axios from 'axios';
import {url,urlgoogle} from "./env";
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
	GET_FARE,
	BOOKING_REQUEST,
	GET_NEARBY_DRIVER,
	BOOKING_CONF
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
					let params = {
						origins:latBe,
						destinations:latWill,
						mode:"driving",
						key:"AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
					};
					// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
					console.log(">>>>>>>>>>>>>>",url+`?origins=${latBe}&destinations=${latWill}&mode=${params.mode}&key=${params.key}`);
					fetch(urlgoogle+`?origins=${latBe}&destinations=${latWill}&mode=${params.mode}&key=${params.key}`)
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

//booking request
export function bookingRequest(){
	return(dispatch,store)=>{
		const nearByDriver=store().home.readyDriver;
		const randOne =Array.from(nearByDriver)[Math.floor(Math.random()*nearByDriver.length)];
		const payload ={
			data : {
				userName:'ahmed',
				be:{
					address:store().home.selectedAddress.be.address,
					name:store().home.selectedAddress.be.name,
					latitude:store().home.selectedAddress.be.location.latitude,
					longitude:store().home.selectedAddress.be.location.longitude
				},
				will:{
					address:store().home.selectedAddress.will.address,
					name:store().home.selectedAddress.will.name,
					latitude:store().home.selectedAddress.will.location.latitude,
					longitude:store().home.selectedAddress.will.location.longitude
				},
				fare:store().home.fare,
				status:"pending"
			},
			nearByDriver:{
				socketId:randOne.socketId,
				driverId:randOne.driverId,
				latitude:randOne.coordinate[1],
				longitude:randOne.coordinate[0]
			}
		};
		Axios
			.post(`${url}/bookings`,payload)
			.then((res)=>{
				
				console.log(res);
				dispatch({
					type:BOOKING_REQUEST,
					payload:res.data
				})
			}).catch((err)=>{console.warn(err)});
	}
}
//GET NEARBY drivers

export function getNearbyDriver(){
	return(dispatch,store)=>{
		fetch(`${url}/driverLocation?latitude=${store().home.region.latitude}&longitude=${store().home.region.longitude}`)
			.then((result)=>result.json())
			.then((result)=>{
				dispatch({
					type:GET_NEARBY_DRIVER,
					payload:result
				});
			});	
	};
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
function handleBookingRequest(state, action){
	return update(state,{
		book:{
			$set:action.payload
		}
	})
}

function handleGetNearbyDriver(state,action){
	return update(state,{
		readyDriver:{
			$set:action.payload
		}
	});
}


function handleBookingConf(state,action){
	return update(state,{
		book:{
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
	GET_FARE:handleGetFare,
	BOOKING_REQUEST:handleBookingRequest,
	GET_NEARBY_DRIVER:handleGetNearbyDriver,
	BOOKING_CONF : handleBookingConf
};
const initialState = {
	region:{},
	InputData:{},
	resultTypes:{},
	predictions:{},
	selectedAddress:{},
	distance:{},
	fare:{},
	book:{},
	readyDriver:{}
};

export function homeReducer(state = initialState,action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state,action) : state;
} 