/* jshint ignore:start */
import React from 'react';
import MapCont from './MapComponent';
import {Container} from 'native-base';
import {View, Text} from "react-native";
import { Actions } from 'react-native-router-flux';
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import logo from '../../../assets/taxi_logo_white.png';
import Fare from './Fare';
import ActionButton from './ActionButton';
import FindDriver from "./FindDriverComp";
class Home extends React.Component{
	
		componentDidMount(){
			
			this.props.getCurrLocation();
			setTimeout(()=>{
				this.props.getNearbyDriver();
			},4000);
		}

		componentDidUpdate(prevProps, prevState){
			if(this.props.book.status=="confirmed"){
				Actions.track({type:"reset"});
			}
		}
		//27.18096, 31.18368
	render(){
		console.log(this.props.region);
		const { status } = this.props.book;
		const region ={
			latitude: 3.146642,
			longitude: 101.695845,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		}
	
		return(
				<Container>
				{ (status !== "pending") &&
					<View style={{flex:1}}>
					<HeaderComponent logo={logo} /> 

				{this.props.region.latitude && 
					
					<MapCont 	region={this.props.region} 
								getInput={this.props.getInput}
								changeBetweenBeAndWill={this.props.changeBetweenBeAndWill}
								resultTypes={this.props.resultTypes}
								predictions={this.props.predictions}
								getPlacesFromGoogle={this.props.getPlacesFromGoogle}
								InputData={this.props.InputData}
								getSelectedAddress={this.props.getSelectedAddress}
								selectedAddress={this.props.selectedAddress}
								readyDriver={this.props.readyDriver}
								/>

					
				}
				<ActionButton onPressAct={this.props.bookingRequest}/>
				{
					this.props.fare &&
					<Fare fare={this.props.fare.fare} />
				}
				<FooterComponent/>
				</View>
				||
					<FindDriver selectedAddress={this.props.selectedAddress}/>
				}
				</Container>
				);
	};
}

export default  Home;
/*
//{this.props.region.latitude && 				}
<View style={styles.container}>			 
<Text>Hello {this.props.name} </Text>
</View>
getPlacesFromGoogle={this.props.getPlacesFromGoogle}

*/
