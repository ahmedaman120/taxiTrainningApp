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
	GET_DRIVER_INFORMATION,
	GET_DISTANCE_FROM_DRIVER,
	GET_DRIVER_LOCATION
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


//Get driver's info 
export function getDriverInfo(){
	return (dispatch,store)=>{
		let id = store().home.booking.driverId;
		console.log(`${url}/driver/${id}`);
		fetch(`${url}/driver/${id}`)
			.then((res)=>res.json())
			.then((res)=>{
				dispatch({
					type:GET_DRIVER_INFORMATION,
					payload:res.body
				});
			})
			.catch((err)=>{console.warn(err);});
	}
}

//get initial location 

export function getDriverLocation(){
	return (dispatch,store)=>{
		let id = store().home.booking.driverId;
		console.log(`${url}/driverLocation/${id}`);

		fetch(`${url}/driverLocation/${id}`)
			.then((res)=>res.json())
			.then((res)=>{
				dispatch({
					type:GET_DRIVER_LOCATION,
					payload:res.body
				});
			})
			.catch((err)=>{console.warn(err);});
	}
}


export function getDistanceFromDriver(){
	return (dispatch,store)=>{
		if(store().track.region){
					let latBe =store().home.selectedAddress.be.location.latitude+","+store().home.selectedAddress.be.location.longitude;
					let latWill =store().track.driverLocation.coordinate.coordinates[1]+","+store().track.driverLocation.coordinate.coordinates[0];
					let params = {
						origins:latBe,
						destinations:latWill,
						mode:"driving",
						key:"AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
					};
					// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
					// console.log(">>>>>>>>>>>>>>",url+`?origins=${latBe}&destinations=${latWill}&mode=${params.mode}&key=${params.key}`);
					fetch(urlgoogle+`?origins=${latBe}&destinations=${latWill}&mode=${params.mode}&key=${params.key}`)
						.then((result)=>result.json())		
						.then((result)=>{
								console.log(result);
								dispatch({
									type:GET_DISTANCE_FROM_DRIVER,
									payload:result.rows[0].elements
								});
						});
		}
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

function handleGetDriverInfo(state,action){
	return update(state,
		{driverInfo:{
				$set:action.payload
			}
		}
	);
}

function handleUpdateDriverLocation(state,action){
	return update(state,
		{driverLocation:{
				$set:action.payload
			}
		}
	);
}
function handleGetDriverLocation(state,action){
	return update(state,
		{driverLocation:{
				$set:action.payload
			},
			showDriverFound:{
				$set:false
			},
			showCarMaker:{
				$set:true
			}
		}
	);
}

function handleGetDistanceFromDriver(state, action){
	return update(state, {
		distanceFromDriver:{
			$set:action.payload
		}
	});
}


const ACTION_HANDLERS = {
	GET_CURR_LOCATION:handleGetCurrLocation,
	GET_DRIVER_INFORMATION:handleGetDriverInfo,
	UPDATE_DRIVER_LOCATION:handleUpdateDriverLocation,
	GET_DRIVER_LOCATION:handleGetDriverLocation,
	GET_DISTANCE_FROM_DRIVER:handleGetDistanceFromDriver
};
const initialState = {
	region:{},
	showDriverFound:true,
	distanceFromDriver:{},
	driverLocation:{},
	driverInfo:{}
};

export function trackReducer(state = initialState,action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state,action) : state;
} 