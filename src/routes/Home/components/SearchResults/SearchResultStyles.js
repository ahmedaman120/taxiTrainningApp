import { Dimensions } from 'react-native';
let width = Dimensions.get("window").width;
const styles={
    searchResWrapper:{
        top:220,
        position:"absolute",
        width:width,
        height:1000,
        backgroundColor:"#fff",
        opacity:0.9
    },
    primaryText:{
        frontWegiht:"bold",
        color:"#373737"
    },
    secondaryText:{
        fontStyle:"italic",
        color:"#7D7D7D"
    },
    leftContainer:{
        flexWrap:'wrap',
        alignItems:"flex-start",
        backgroundColor:"#7D7D7D"
    },
    rightIcon:{
        fontSize:20,
        color:"#7D7D7D"
    },
    distance:{
        fontSize:12
    }
};


export default styles;