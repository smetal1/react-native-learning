import React, {useState, useRef,useEffect} from 'react';
import { View ,Text, StyleSheet,Alert, ScrollView, FlatList,Dimensions} from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Cards from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';


const generateRandomBetween = (min,max,exclude)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    const rndNum=Math.floor(Math.random()*(max-min)+min);
    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude);
    }else {
        return rndNum;
    }
}

const renderListItem = (listLength,itemData)=>{
return ( <View key={itemData.value} style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
<Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>)
}

const GameScreen = props =>{
    const initialGuess= generateRandomBetween(1,100,props.userChoice)
    const [currentGuess,setCurrentGuess]=useState(initialGuess.toString());
    const currentLow=useRef(1)
    const currentHigh=useRef(100)
    const { userChoice, onGameOver } = props;
    const [pastGuesses,setPastGuesses]=useState([initialGuess]);

    useEffect(()=>{
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }),[currentGuess,userChoice,onGameOver];

    const nextGuessHandler = direction =>{
        if((direction==='lower' && currentGuess < props.userChoice)||(direction==='greater' && currentGuess>props.userChoice)){
                Alert.alert("Don't lie!","You know that this is wrong.",[
                    {text: 'Sorry',style: 'cancel'}
                ]);
                return;
            }
        if (direction ==='lower'){
            currentHigh.current = currentGuess;
           
        }else {
            currentLow.current=currentGuess + 1;
        }
        const nextNumber=generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
        setCurrentGuess(nextNumber)
        //setRounds(curRounds=>curRounds+1);
        setPastGuesses(currPastGuesses=>[nextNumber.toString(),...currPastGuesses])
    }

    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.titleText}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Cards style={styles.buttonContainer}>
                <MainButton  onPress={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton  onPress={nextGuessHandler.bind(this,'greater')}>
                <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Cards>
            <View style={styles.listConatiner}>
            {/*<ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess,index )=> renderListItem(guess,pastGuesses.length -index))}
    </ScrollView>*/}
            <FlatList contentContainerStyle={styles.list} keyExtractor={(item)=>item} data={pastGuesses} renderItem={renderListItem.bind(this,pastGuesses.length,)}/>
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ?20:5,
        width: 300,
        maxWidth: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
       justifyContent: 'space-around',
       width: '60%'
    },
    listConatiner:{
        width: '80%',
        flex: 1
    },
    list :{
        alignItems : 'center',
        justifyContent: 'flex-end',
        flexGrow: 1
    }
});

export default GameScreen;