import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
const GoalItem= porps =>{
  return(
       <TouchableOpacity onPress={porps.onDelete.bind(this, porps.id)}>
            <View style={styles.listitem} >
            <Text>{porps.title}</Text>
            </View>
        </TouchableOpacity> 
    )
}
const styles = StyleSheet.create({
    listitem:{
        padding: 10,
  marginVertical: 10,
  backgroundColor: '#ccc',
  borderColor: 'black',
  borderWidth: 1
}
});
export default GoalItem;