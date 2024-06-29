import {Button  } from '@rneui/base';

import jsonData from './public/exercises.json';
import resim1 from './assets/resim1.jpg';
import zayif from './assets/zayif.jpg';
import normalkilo from './assets/normalkilo.jpg';
import fazlakilo from './assets/fazlakilolu.jpg';
import birdereceobez from './assets/1dereceobez.jpg';
import ikidereceobez from './assets/2dereceobez.jpg';
import morbidobez from './assets/morbidobez.jpg';
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
 
  ScrollView,
  border,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const Stack = createStackNavigator();
const AwesomeButton = () => (<Button title='Welcome'/>);
export default function App() {
  

  
 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Next" component={NextScreen} />
        <Stack.Screen name="Myworkout" component={MyWorkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function HomeScreen({ navigation ,route}) {
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [gender,setGender]=useState(null);
  const fuc1 = (inputHeight) => {
    setHeight(inputHeight);
  }

  const fuc2 = (inputWeight) => {
    setWeight(inputWeight);
    
  }

  const butCon = () => {
    const bmiVal = (weight/(height/100*height/100)).toFixed(2);
    setBMI(bmiVal);
    navigation.navigate('Next', { gender,height, weight,bmi:bmiVal });
  }
 
  const yakaFunc = (value) =>{
  
    console.log(value);
    setGender(value);
    
  }
  return (
    
    <View style={styles.container}>
     
      <ImageBackground
      source={resim1}
      style={styles.background}
    >
    <View style={styles.headContainer}>
      <Text style={styles.head}>𝓶𝓾𝓼𝓬𝓵𝓮𝓿𝓮𝓷𝓲𝓪</Text>
      
      </View>
      <Text style={styles.text}>Boyunuzu cm cinsinden girin:</Text>
     <View style={styles.inputContainer}> 
     
  <TextInput
 
        style={styles.input}
        onChangeText={fuc1}
        value={height}
        keyboardType="numeric"
        
      />

      
      </View>
      <Text style={styles.text}>Kilonuzu girin:</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={fuc2}
        value={weight}
        keyboardType="numeric"
      />
      </View>
      <View style={styles.pickerstyle}>
      <RNPickerSelect 
      
        onValueChange={ yakaFunc}
        items={[
          { label: 'Male', value: 'Male',color:'black' },
          { label: 'Female', value: 'Female',color:'black' },
          
        ]}
      
      />
      </View>
      <Button title="Tiklayin" onPress={butCon}></Button>
      </ImageBackground>
      
    </View>
  );
}

function NextScreen({navigation, route }) {
  const [showImage, setShowImage] = useState(true);
  const [imageSource, setImageSource] = useState(null);
  const thirScreeBut = () =>{
    navigation.navigate('Third');
  }
  const { height, weight,bmi,gender } = route.params;
  const durum = () =>{
    if (bmi<=18.5){
     return 'Thin';
    }
    else if(bmi>18.5 && bmi<24.9){
      return 'Normal kilo';
    }
   
    else if(bmi>24.9 && bmi<=29.9){
      return 'Fazla kilo';
    }
    else if(bmi>29.9 && bmi<=34.9){
      return '1.Derece Obez';
    }
    else if(bmi>34.9 && bmi<=39.9){
      return '2.Derece Obez';
    }
    else if(bmi=>40){
      return 'Morbid Obez';
    }
  }
  useEffect(() => {
    setImageSource(resimliDurum(bmi));
  }, [bmi]);
  const resimliDurum = (bmi) =>{
    if (bmi<=18.5){
     return require('./assets/zayif.jpg');
    }
    else if(bmi>18.5 && bmi<24.9){
      return require('./assets/normalkilo.jpg');
    
    }
   
    else if(bmi>24.9 && bmi<=29.9){
      return require('./assets/fazlakilolu.jpg');
    }
    else if(bmi>29.9 && bmi<=34.9){
      return require('./assets/1dereceobez.jpg');
    }
    else if(bmi>34.9 && bmi<=39.9){
      return require('./assets/2dereceobez.jpg');
    }
    else if(bmi=>40){
      return require('./assets/morbidobez.jpg');
    }
  }
  const butForThird = () =>{
    navigation.navigate('Myworkout', { gender,height, weight,bmi });
  }
  return (
    <View style={styles.textContainer}>
      <View style={styles.secondPageDes}>
      <Text style={styles.text}>Boyun : {height}</Text>
      <Text style={styles.text}>Kilo : {weight}</Text>
      <Text style={styles.text}>BMI : {bmi} </Text>
      <Text style={styles.text}>Gender : {gender} </Text>
      <Text style={styles.text}>Status : {durum()}</Text>
      <View style={styles.imgContainer}>
          {showImage && imageSource && (
            <Image source={imageSource} style={styles.image} />
          )}
        </View>
        <Button title='Generate a Workout Program' onPress={butForThird}></Button>
      </View>
    </View>
  );
  
}
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


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    
   
  },
  headContainer:{
    
    flex:1,
    
  },
  head:{
    
    fontSize:80,
    color:'white',
    
    
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  input:{
    backgroundColor:"white",
    color:"black",
    
    width:'60%',
    textAlign:"center",
    paddingTop:1,
    marginBottom:5,
    
  },
  textContainer:{
    flex:1,
    backgroundColor: 'black',
   
  },
  text:{
    
    fontSize:16,
    color:"white",
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    
    
  },
  secondPageDes:{
    marginTop:10,
    
    width:394,
   borderWidth:3,

  borderColor: 'white',
  borderRadius:10,
  justifyContent:'center'
  },
  textSelect1:{
    textAlign:'center',
    width:180,
      color:'green',
     borderWidth: 1,
     borderRadius:3,
    borderColor: 'white',
   
  },
  textSelect2:{
    width:320,
      color:'green',
     borderWidth: 1,
    textAlign:'center',
    borderColor: 'white',
    borderRadius:3,
   
  },
  pickerstyle: {
    height:'6%',
   width:'60%',
    alignSelf:'center',
  backgroundColor:'white',
    textAlign:'center',
   marginBottom:10,
  },
  
  background: {
    
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imgContainer:{
    flexDirection:'row',
    justifyContent:'center',
    
  },
 
});