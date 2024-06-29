import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, Image, ImageBackground, Keyboard, View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import jsonData from './exercises.json'
import MoveList from "./Pages/MoveList"
import MoveDetails from "./Pages/MoveDetails"
import DisplayUserInfo from "./Pages/DisplayUserInfo"
import MyWorkout from "./Pages/MyWorkout"
import styles from './Pages/styles';
import resim1 from './assets/resim1.jpg';
import GenerateWorkout from './Pages/GenerateWorkout';
import ProfileStatus from './Pages/ProfileStatus';
import GetUserInfo from './Pages/GetUserInfo';
import Login from './Pages/Login';

const Stack = createStackNavigator();

function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="GetUserInfo" component={GetUserInfo} />
        <Stack.Screen name="DisplayUserInfo" component={DisplayUserInfo} />
        <Stack.Screen name="MoveList" component={MoveList} />
        <Stack.Screen name="MoveDetails" component={MoveDetails} />
        <Stack.Screen name="GenerateWorkout" component={GenerateWorkout} />
        <Stack.Screen name="ProfileStatus" component={ProfileStatus} />
        <Stack.Screen name="MyWorkout" component={MyWorkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainApp;