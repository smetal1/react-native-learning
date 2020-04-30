import React, {useState} from 'react';
import {View ,Text,StyleSheet, Button , Image} from 'react-native';
import DefaultStyles from '../constants/default-styles'
import Colors from '../constants/color';
import MainButton from '../components/MainButton';


const GameOverScreen = props =>{
    return (
        <View style={styles.screen}>
        <Text style={DefaultStyles.titleText}> The Game is Over!</Text>
        <View style={styles.imageContainer}>
        <Image 
            source={require('../assets/success.png')} 
            style={styles.image}
            resizeMode='cover'
            />
        </View>
        <Text style={DefaultStyles.bodyText}> Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds  to guess the number <Text style={styles.highlight}>{props.userNumber}</Text> </Text>

    <View style={styles.buttonStyle}>
    <MainButton  onPress={props.onRestart}>
        New Game 
    </MainButton>
    </View>
        </View>
    )
};

const styles=StyleSheet.create({
 screen :{
     flex: 1,
     justifyContent: 'center',
     alignItems:'center'
 },
 buttonStyle: {
    
     paddingVertical: 20
 },
 image: {
     width: '100%',
     height: '100%',
     borderRadius: 700
     
 },
 imageContainer: {
     width: 300,
     height: 300,
     borderRadius: 150,
     borderWidth: 3,
     borderColor: 'black',
     overflow: 'hidden'
 },
 highlight:{
     color: Colors.primary,
     fontFamily: 'open-sans-bold'
 }
});

export default GameOverScreen;

