import { connect } from 'react-redux';
import Track from '../components/Track';
import {
	getCurrLocation,
	getDriverInfo,
	getDriverLocation,
	getDistanceFromDriver
	} from '../modules/trackAct';

const mapStateToProps = (state) =>({
	region:state.track.region,
	selectedAddress:state.home.selectedAddress || {},
	driverInfo:state.track.driverInfo || {},
	driverLocation:state.track.driverLocation,
	showDriverFound:state.track.showDriverFound,
	showCarMaker:state.track.showCarMaker,
	distanceFromDriver:state.track.distanceFromDriver || {}

});

const mapActionCreators = {
	getCurrLocation,
	getDriverInfo,
	getDriverLocation,
	getDistanceFromDriver
};

export default connect(mapStateToProps,mapActionCreators)(Track);
