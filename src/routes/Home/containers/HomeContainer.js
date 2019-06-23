import { connect } from 'react-redux';
import Home from '../components/Home';
import {
	getCurrLocation,
	getInput,
	changeBetweenBeAndWill} from '../modules/homeAct';

const mapStateToProps = (state) =>({
	region:state.home.region,
	InputData:state.home.InputData || {},
	resultTypes :state.home.resultTypes || {},
	predictions :state.home.predictions || [],
});

const mapActionCreators = {
	getCurrLocation,
	getInput,
	changeBetweenBeAndWill
};

export default connect(mapStateToProps,mapActionCreators)(Home);
