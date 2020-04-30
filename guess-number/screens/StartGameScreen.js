import React, {useState} from 'react';
import {View,Text,StyleSheet, Button, TouchableWithoutFeedback,Keyboard,Alert,Dimensions} from 'react-native';
import Card from '../components/Card';
import Color from '../constants/color'
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen=props=>{
    const [enteredValue,setEnteredValue]=useState('');
    const [confirmed,setConfirmed]=useState(false);
    const [selectedNumber,setSelectedNumber]=useState()
    const numberInputHandler=inputText =>{

        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false)
    }
    const confirmInputHandler = () => {
        const chosenNumber= parseInt(enteredValue);
        if (isNaN(chosenNumber)||chosenNumber<=0 || chosenNumber>99){
            Alert.alert("Invalid number!","Number has to be a number between 1 to 99.",[{text: 'Okay',style: 'destructive',onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber)
        setEnteredValue('');
    }

    let confirmedOutput;
    if (confirmed){
    confirmedOutput=<Card style={styles.summaryContainer}>
        <Text>You Selected </Text>
    <NumberContainer>{selectedNumber}</NumberContainer>
    <MainButton  onPress={()=>props.onStartGame(selectedNumber)}>
        START GAME
    </MainButton>
    </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text style={styles.text}>Select a Number</Text>
                <Input style={styles.input} 
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType="number-pad"
                 maxLength={2}
                 onChangeText={numberInputHandler}
                 value={enteredValue}/>
                <View style={styles.buttonConatiner}>
                    <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Color.accent}/></View>
                   <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Color.primary}/></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
   
};

const styles=StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'

    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'

    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '80%',
        alignItems: 'center',
        
    },
    buttonConatiner: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 15
    },
    button: {
        width: Dimensions.get('window').width /4 
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20
    }
});

export default StartGameScreen;