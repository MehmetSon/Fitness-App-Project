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
//import axios from 'axios';
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

function DisplayUserInfo({ navigation, route }) {
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
        return 'Normal Weight';
      }
     
      else if(bmi>24.9 && bmi<=29.9){
        return 'Overweight';
      }
      else if(bmi>29.9 && bmi<=34.9){
        return 'Obesity Class 1';
      }
      else if(bmi>34.9 && bmi<=39.9){
        return 'Obesity Class 2';
      }
      else if(bmi=>40){
        return 'Obesity Class 3 (Morbidly Obese)';
      }
    }
    useEffect(() => {
      setImageSource(resimliDurum(bmi));
    }, [bmi]);
    const resimliDurum = (bmi) =>{
      if (bmi<=18.5){
       return require('./../assets/zayif.jpg');
      }
      else if(bmi>18.5 && bmi<24.9){
        return require('./../assets/normalkilo.jpg');
      
      }
     
      else if(bmi>24.9 && bmi<=29.9){
        return require('./../assets/fazlakilolu.jpg');
      }
      else if(bmi>29.9 && bmi<=34.9){
        return require('./../assets/1dereceobez.jpg');
      }
      else if(bmi>34.9 && bmi<=39.9){
        return require('./../assets/2dereceobez.jpg');
      }
      else if(bmi=>40){
        return require('./../assets/morbidobez.jpg');
      }
    }
    const butForThird = () =>{
      navigation.navigate('GenerateWorkout', { gender,height, weight,bmi });
    }
    return (
      <View style={styles.textContainer}>
        <View style={styles.secondPageDes}>
        <Text style={styles.text}>Height: {height}</Text>
        <Text style={styles.text}>Weight: {weight}</Text>
        <Text style={styles.text}>BMI: {bmi} </Text>
        <Text style={styles.text}>Gender: {gender} </Text>
        <Text style={styles.text}>Status: {durum()}</Text>
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

  export default DisplayUserInfo;