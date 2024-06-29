import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, Image, ImageBackground, Keyboard, View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import styles from './styles';
import resim1 from './../assets/resim1.jpg';

function GetUserInfo({ navigation ,route }) {
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
      navigation.navigate('DisplayUserInfo', { gender,height, weight,bmi:bmiVal });
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
        <Text style={styles.text}>Enter your height in cm:</Text>
       <View style={styles.inputContainer}> 
       
    <TextInput
   
          style={styles.input}
          onChangeText={fuc1}
          value={height}
          keyboardType="numeric"
          
        />
  
        
        </View>
        <Text style={styles.text}>Enter your weight:</Text>
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
        <Button title="Continue" onPress={butCon}></Button>
        {/* <Button onPress={() => navigation.navigate('MoveList')} title={'Move List'}></Button>
        <Button onPress={() => navigation.navigate('GenerateWorkout')} title={'Generate Workout'}></Button>
        <Button onPress={() => navigation.navigate('ProfileStatus')} title={'Profile'}></Button> */}
        </ImageBackground>
        
      </View>
    );
  }

export default GetUserInfo;