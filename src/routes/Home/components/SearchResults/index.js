/* jshint ignore:start */
import React from 'react';
import {Text} from 'react-native';
import { View, List, ListItem, Left, Body,Icon, Right } from 'native-base';
// import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './SearchResultStyles';
import RNGooglePlaces  from 'react-native-google-places';


class SearchResults extends React.Component{

    state = {
        predictions:[],
        error:""
    };
    handleSelectedAddress(placeId){
        this.props.getSelectedAddress(placeId);
    }
	render(){
		return(
            <View style={styles.searchResWrapper}>
            
                    <List
                        dataArray={this.props.predictions}
                        renderRow={(item)=>
                            <View>
                                <ListItem onPress={()=>this.handleSelectedAddress(item.placeID)} button avatar>
                                <Right   style={styles.leftContainer}>
                                    <Icon style={styles.rightIcon} name="navigate"/>
                                </Right>
                                <Body>
                                    <Text style={styles.primaryText}>{item.primaryText}</Text>
                                    <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                                </Body>
                                </ListItem>
                                
                            </View>
                        }
                    />
            </View>
		);
	};
}

export default  SearchResults;