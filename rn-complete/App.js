import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode,setIsAddMode]=useState(false);


  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [...courseGoals, {key: Math.random().toString(),value : goalTitle}])
    setIsAddMode(false)
  }
  const removeGoalHandler = goalId =>{
    setCourseGoals(currentGoals=>{
      console.log(currentGoals.length )
      return currentGoals.filter((goal)=> goal.key !== goalId);
    })
  }
  const cancelGoalAdditionModel=()=>{
    setIsAddMode(false)
}

  return (

    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={()=>setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionModel}/>
      
  <FlatList  
  data={courseGoals} 
  renderItem={itemData => <GoalItem id={itemData.item.key} title={itemData.item.value} 
  onDelete={removeGoalHandler}/> 
  }/>
         

        </View>
   

  );
}

const styles = StyleSheet.create({
        screen: {
        padding: 50
}


});