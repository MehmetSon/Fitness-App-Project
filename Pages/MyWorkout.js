//import {Button  } from '@rneui/base';
import jsonData from './../exercises.json';
import resim1 from './../assets/resim1.jpg';
import zayif from './../assets/zayif.jpg';
import normalkilo from './../assets/normalkilo.jpg';
import fazlakilo from './../assets/fazlakilolu.jpg';
import birdereceobez from './../assets/1dereceobez.jpg';
import ikidereceobez from './../assets/2dereceobez.jpg';
import morbidobez from './../assets/morbidobez.jpg';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useState,useEffect } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput, 
 Button,
  ScrollView,
  border,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';

function MyWorkout({ navigation ,route}){
    const { height, weight,bmi,gender } = route.params;
    const printedExercises = new Set(); 
     
    const [exercises, setExercises] = useState([]);
    const [ex, setEx] = useState('');
      const veriCek = async (ex) => {
        try {
          const res = await axios.get('http://192.168.1.55:8081/public/exercises.json');
      
          const muscleGroups = ['abdominals', 'hamstrings', 'adductors','quadriceps','biceps','shoulders'];
          const printedExercises = {};
          const tempExercises = [];
          for (let muscleGroup of muscleGroups) {
            printedExercises[muscleGroup] = new Set(); // Initialize an empty set for each muscle group
          }
      
          for (let x = 0; x < res.data.length; x++) {
            const exercise = res.data[x];
            
            // Check if the exercise targets one of the muscle groups
            for (let muscleGroup of muscleGroups) {
              if (exercise.primaryMuscles == muscleGroup && printedExercises[muscleGroup].size < 2 && !printedExercises[muscleGroup].has(exercise.name)) {
                console.log(exercise.name); // Print the exercise name
                
                tempExercises.push(exercise.name);
                printedExercises[muscleGroup].add(exercise.name); // Add exercise name to the set
                break; // Move to the next exercise
              }
            }
      
            // Break the loop if all muscle groups have two printed exercises
            let allGroupsHaveTwoPrinted = muscleGroups.every(muscleGroup => printedExercises[muscleGroup].size === 2);
            if (allGroupsHaveTwoPrinted) {
              break;
            }
          }
          setExercises(tempExercises); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      // Empty dependency array to run the effect only once
  
    return (
      <View style={styles.container} > 
        <Button title='bas' onPress={veriCek}  ></Button>
        
      
  
        {exercises.map((exercise, index) => (
          <Text style={styles.text} key={index}>{exercise}</Text>
        ))}
      
    </View>
    );
  
  }

  export default MyWorkout;