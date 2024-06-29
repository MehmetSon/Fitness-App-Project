import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, Image, View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import jsonData from './../exercises.json';

const MoveDetails = ({navigation, route}) => {
    const { movement } = route.params;
  
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text>Name: {movement.name}</Text>
        <Text style={{textTransform: 'capitalize'}}>Category: {movement.category}</Text>
        <Text style={{textTransform: 'capitalize'}}>Level: {movement.level}</Text>
        <Text style={{textTransform: 'capitalize'}}>Force: {movement.force}</Text>
        <Text style={{textTransform: 'capitalize'}}>Mechanic: {movement.mechanic}</Text>
        <Text style={{textTransform: 'capitalize'}}>Equipment: {movement.equipment}</Text>
        <Text style={{textTransform: 'capitalize'}}>Primary Muscles: {movement.primaryMuscles}</Text>
        <Text style={{textTransform: 'capitalize'}}>Secondary Muscles: {movement.secondaryMuscles}</Text>
        <Text>Details: {movement.instructions}</Text>
        {movement.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: `https://raw.githubusercontent.com/yuhonas/free-exercise-db/5197c055b356498944328bd00178b64a5e9f422c/exercises/${image}` }}
            style={{ width: 200, height: 200, marginBottom: 10 }}
          />
        ))}
      </View>
    );
  };

  export default MoveDetails;