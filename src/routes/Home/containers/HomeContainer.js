import { connect } from 'react-redux';
import Home from '../components/Home';
import {
	getCurrLocation,
	getInput,
	changeBetweenBeAndWill,
	getPlacesFromGoogle,
	getSelectedAddress,
	bookingRequest,
	getNearbyDriver} from '../modules/homeAct';

const mapStateToProps = (state) =>({
	region:state.home.region,
	InputData:state.home.InputData || {},
	resultTypes :state.home.resultTypes || {},
	predictions :state.home.predictions || [],
	selectedAddress:state.home.selectedAddress || {},
	distance:state.home.distance || {},
	fare:state.home.fare || {},
	book:state.home.book || {},
	readyDriver:state.home.readyDriver || {}
});

const mapActionCreators = {
	getCurrLocation,
	getInput,
	changeBetweenBeAndWill,
	getPlacesFromGoogle,
	getSelectedAddress,
	bookingRequest,
	getNearbyDriver
};

export default connect(mapStateToProps,mapActionCreators)(Home);
