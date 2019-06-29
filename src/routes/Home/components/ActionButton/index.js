import React from "react";
import {Text} from "react-native";
import { View, Button} from "native-base";

import styles from "./ActionButtonStyles";

export const ActionButton = ({onPressAct})=>{
	return (
		<Button style={styles.fabContainer} onPress= {onPressAct}>
			<Text style={styles.btnText}> BOOK !</Text>
		</Button>

	);
}

export default  ActionButton;