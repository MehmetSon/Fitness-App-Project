import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, Image, View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import jsonData from './../exercises.json';
import styles from './styles';

const GenerateWorkout = ({navigation, route}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [levelvalue, setLevel] = useState([])
    const [equipmentvalue, setEquipment] = useState([])
    const [musclesvalue, setMuscles] = useState([])

    function arrayContainsAny(mainArray, searchArray) {
        return mainArray.some(val => searchArray.includes(val));
    }
  
    const handleMovementPress = (movement) => {
        navigation.navigate('MoveDetails', { movement });
    };

    const [selectedItems, setSelectedItems] = useState([]);

    const pickRandomItems = () => {
        setSelectedItems([])
        const filteredItems = jsonData.filter(item => 
            (levelvalue.length == 0 || levelvalue.includes(item.level)) && 
            (arrayContainsAny(musclesvalue, item.primaryMuscles)) &&
            (equipmentvalue == 'Any' || equipmentvalue.length == 0 || equipmentvalue.includes(item.equipment)) 
          );
        if (musclesvalue.includes('chest') || musclesvalue.includes('shoulders') || musclesvalue.includes('biceps') || musclesvalue.includes('triceps') || musclesvalue.includes('quadriceps') || musclesvalue.includes('middle back') ) {
          numberOfItems = 2;
        }
        else{
          numberOfItems = 3;
        }
        const shuffledItems = filteredItems.sort(() => 0.5 - Math.random());
        const randomItems = shuffledItems.slice(0, numberOfItems);
        setSelectedItems(randomItems);
        addRandomItems('chest');
        addRandomItems('shoulders');
        addRandomItems('biceps');
        addRandomItems('triceps');
        addRandomItems('quadriceps');
        addRandomItems('middle back');
        if (numberOfItems==2){
          addRandomItems('hamstrings');
        }
      };

    function addRandomItems (randommuscle) {
        setSelectedItems(prevSelectedItems => {
        const filteredItems = jsonData.filter(item => 
            (levelvalue.length == 0 || levelvalue.includes(item.level)) && 
            (item.primaryMuscles.includes(randommuscle)) &&
            (equipmentvalue == 'Any' || equipmentvalue.length == 0 || equipmentvalue.includes(item.equipment)) 
          );
        const numberOfItems = 1;
        const shuffledItems = filteredItems.sort(() => 0.5 - Math.random());
        const randomItems = shuffledItems.slice(0, numberOfItems);
        return prevSelectedItems.concat(randomItems);
      })
    }

    const numbers = [5, 10, 15];
    const getRandomNumber = () => {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers[randomIndex];
      return randomNumber;
    };

    return (
      <View style={{ flex: 1,  marginHorizontal: 10  }}>
        <Text style={styles.textSelect1}>Muscles to focus on:</Text>
        <MultiSelect 
          items={[
            {label: 'Abdominals', value: 'abdominals'},
            {label: 'Abductors', value: 'abductors'},
            {label: 'Adductors', value: 'adductors'},
            {label: 'Biceps', value: 'biceps'},
            {label: 'Calves', value: 'calves'},
            {label: 'Chest', value: 'chest'},
            {label: 'Forearms', value: 'forearms'},
            {label: 'Glutes', value: 'glutes'},
            {label: 'Hamstrings', value: 'hamstrings'},
            {label: 'Lats', value: 'lats'},
            {label: 'Lower Back', value: 'lower back'},
            {label: 'Middle Back', value: 'middle back'},
            {label: 'Neck', value: 'neck'},
            {label: 'Quadriceps', value: 'quadriceps'},
            {label: 'Shoulders', value: 'shoulders'},
            {label: 'Traps', value: 'traps'},
            {label: 'Triceps', value: 'triceps'},
          ]}
          displayKey="label"
          uniqueKey="value"
          onSelectedItemsChange={(value) => setMuscles(value)}
          selectedItems={musclesvalue}
          selectText="Select muscles"
          single={true}
          textInputProps={{ autoFocus: false }}
          searchInputPlaceholderText="Search Muscles..."
          style={styles.pickerstyle}
          />   

        <Button title="Generate Workout" onPress={pickRandomItems} />
      {selectedItems.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{marginBottom:20}}>Your Workout:</Text>
          <FlatList
            data={selectedItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMovementPress(item)}>
                <View style={{ marginBottom: 10 }}>
                  <Text>{item.name}</Text>
                  <Text>{getRandomNumber()} Reps</Text>
                  {/* <Text style={{textTransform: 'capitalize'}}>{item.level}</Text>
                  <Text style={{textTransform: 'capitalize'}}>{item.category}</Text> */}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      
      <View style={styles.myWorkMovelist}>
        <Button type="outline" title='Profile' onPress={() => navigation.navigate('ProfileStatus' )}></Button>
        <Button type="outline" title='My Workout' onPress={() => navigation.navigate('GenerateWorkout')}></Button>
        <Button type="outline" title='Search' onPress={() => navigation.navigate('MoveList')}></Button>
      </View>

      </View>
      
    );
  };
//, { gender,height, weight,bmi }
  export default GenerateWorkout;