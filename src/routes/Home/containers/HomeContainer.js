import { connect } from 'react-redux';
import Home from '../components/Home';
import {getCurrLocation} from '../modules/homeAct';

const mapStateToProps = (state) =>({
	region:state.home.region
});

const mapActionCreators = {
	getCurrLocation
};

export default connect(mapStateToProps,mapActionCreators)(Home);
