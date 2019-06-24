/* jshint ignore:start */
import React from 'react';
import {Text} from 'react-native';
import { View, List, ListItem, Left, Body } from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './SearchResultStyles';
import RNGooglePlaces  from 'react-native-google-places';


class SearchResults extends React.Component{

    state = {
        predictions:[],
        error:""
    };
        // getPlacesFromGoogle=()=>{
        //     RNGooglePlaces.
        //         getAutocompletePredictions(this.props.resultTypes.be ? this.props.InputData.be  : this.props.InputData.will,{country:"EG"})
        //         .then((results) => this.setState({ predictions: results }))
        //         .catch((error) => this.setState({ error: error.message }));
        //     };
        // {this.getPlacesFromGoogle()}
	render(){
		return(
            <View style={styles.searchResWrapper}>
            
                    <List
                        dataArray={this.props.predictions}
                        renderRow={(item)=>
                            <View>
                                <ListItem button avatar>
                                <Left style={styles.leftContainer}>
                                    <Icon style={styles.leftIcon} name="location"/>
                                </Left>
                                </ListItem>
                                <Body>
                                    <Text style={styles.primaryText}>{item.primaryText}</Text>
                                    <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                                </Body>
                            </View>
                        }
                    />
            </View>
		);
	};
}

export default  SearchResults;