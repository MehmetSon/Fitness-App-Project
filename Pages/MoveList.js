import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, Image, View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import jsonData from './../exercises.json';
import styles from './styles';
import CollapsibleView from "@eliav2/react-native-collapsible-view";

const MoveList = ({navigation, route}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const [namevalue, setName] = useState('Any')
    const [levelvalue, setLevel] = useState([])
    const [forcevalue, setForce] = useState([])
    const [mechanicvalue, setMechanic] = useState([])
    const [equipmentvalue, setEquipment] = useState([])
    const [musclesvalue, setMuscles] = useState([])
    const [categoryvalue, setCategory] = useState([])

    const filteredItems = jsonData.filter(item => 
         (namevalue == 'Any' || item.name.toLowerCase().includes(namevalue.toLowerCase())) &&
         (levelvalue == 'Any' || levelvalue.length == 0 || levelvalue.includes(item.level)) && 
         (categoryvalue == 'Any' || categoryvalue.length == 0 || categoryvalue.includes(item.category)) && 
         (forcevalue == 'Any' || forcevalue.length == 0 || forcevalue.includes(item.force)) && 
         (mechanicvalue == 'Any' || mechanicvalue.length == 0 || mechanicvalue.includes(item.mechanic)) &&
         (musclesvalue == 'Any' || musclesvalue.length == 0 || arrayContainsAny(musclesvalue, item.primaryMuscles) || arrayContainsAny(musclesvalue, item.secondaryMuscles)) &&
         (equipmentvalue == 'Any' || equipmentvalue.length == 0 || equipmentvalue.includes(item.equipment)) 
    );

    // const [filteredItems, setFilteredItems] = useState([])

    // useEffect(() => {
    //   const a = jsonData.filter(item => {
    //     //console.log(musclesvalue, item.primaryMuscles, arrayContainsAny(musclesvalue, item.primaryMuscles));
        
    //     (namevalue == 'Any' || item.name.toLowerCase().includes(namevalue.toLowerCase())) &&
    //     (levelvalue == 'Any' || levelvalue.length == 0 || levelvalue.includes(item.level)) && 
    //     (categoryvalue == 'Any' || categoryvalue.length == 0 || categoryvalue.includes(item.category)) && 
    //     (forcevalue == 'Any' || forcevalue.length == 0 || forcevalue.includes(item.force)) && 
    //     (mechanicvalue == 'Any' || mechanicvalue.length == 0 || mechanicvalue.includes(item.mechanic)) &&
    //     //Array.isArray(item.primaryMuscles) && musclesvalue.forEach(val => item.primaryMuscles.forEach(as => val === as))     && //doesnt work
    //     //(musclesvalue == 'Any' || musclesvalue.length == 0 || arrayContainsAny(musclesvalue, item.primaryMuscles)) &&
    //     (equipmentvalue == 'Any' || equipmentvalue.length == 0 || equipmentvalue.includes(item.equipment)) 
    // });

    //   setFilteredItems(a)
    // }, [namevalue, levelvalue, forcevalue, mechanicvalue, equipmentvalue, musclesvalue, categoryvalue])

    //const [filteredItems, setFilteredItems] = useState([])

    // useEffect(() => {
    //   console.log(`sasa`)

    //   jsonData.filter(item => {
    //     console.log(musclesvalue, item.primaryMuscles, item.primaryMuscles.forEach(item => musclesvalue.includes(item)))

        //(namevalue == 'Any' || item.name.toLowerCase().includes(namevalue.toLowerCase())) &&
        //(levelvalue == 'Any' || levelvalue.length == 0 || levelvalue.includes(item.level)) && 
        //(categoryvalue == 'Any' || categoryvalue.length == 0 || categoryvalue.includes(item.category)) && 
        //(forcevalue == 'Any' || forcevalue.length == 0 || forcevalue.includes(item.force)) && 
        //(mechanicvalue == 'Any' || mechanicvalue.length == 0 || mechanicvalue.includes(item.mechanic)) &&
        //(musclesvalue == 'Any' || musclesvalue.length == 0 || musclesvalue.includes(item.primaryMuscles)) && //doesnt work
        //(equipmentvalue == 'Any' || equipmentvalue.length == 0 || equipmentvalue.includes(item.equipment)) 
    //   });
    // }, [[musclesvalue])
  
    function arrayContainsAny(mainArray, searchArray) {
      return mainArray.some(val => searchArray.includes(val));
    }

    const handleMovementPress = (movement) => {
        navigation.navigate('MoveDetails', { movement });
    };

    return (
      
      <View style={{ flex: 1,  marginHorizontal: 10  }}>
        <CollapsibleView title="Search / Filter">
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          placeholder="Search:"
          onChangeText={(value) => setName(value)}
        />
        
        <Text style={styles.textSelect1}>Level:</Text>
        <MultiSelect 
          items={[
            {label: 'Any', value: 'Any'},
            {label: 'Beginner', value: 'beginner'},
            {label: 'Intermediate', value: 'intermediate'},
            {label: 'Expert', value: 'expert'},
          ]}
          displayKey="label"
          uniqueKey="value"
          onSelectedItemsChange={(value) => setLevel(value)}
          selectedItems={levelvalue}
          selectText="Any"
          single={true}
          textInputProps={{ editable: false }}
          searchInputPlaceholderText=""
          searchIcon={false}
          style={styles.pickerstyle}
          />
  
        <Text style={styles.textSelect1}>Category:</Text>
        <MultiSelect 
          items={[
            {label: 'Any', value: 'Any'},
            {label: 'Powerlifting', value: 'powerlifting'},
            {label: 'Strength', value: 'strength'},
            {label: 'Stretching', value: 'stretching'},
            {label: 'Cardio', value: 'cardio'},
            {label: 'Olympic Weightlifting', value: 'olympic weightlifting'},
            {label: 'Strongman', value: 'strongman'},
            {label: 'Plyometrics', value: 'plyometrics'},
          ]}
          displayKey="label"
          uniqueKey="value"
          onSelectedItemsChange={(value) => setCategory(value)}
          selectedItems={categoryvalue}
          selectText="Any"
          single={true}
          textInputProps={{ editable: false }}
          searchInputPlaceholderText=""
          searchIcon={false}
          style={styles.pickerstyle}
          />    
  
        <Text style={styles.textSelect1}>Force:</Text>
        <MultiSelect
            items={[
              {label: 'Any', value: 'Any'},
              {label: 'None', value: null},
              {label: 'Static', value: 'static'},
              {label: 'Push', value: 'push'},
              {label: 'Pull', value: 'pull'},
            ]}
            displayKey="label"
            uniqueKey="value"
            onSelectedItemsChange={(value) => setForce(value)}
            selectedItems={forcevalue}
            selectText="Any"
            single={true}
            textInputProps={{ editable: false }}
            searchInputPlaceholderText=""
            searchIcon={false}
            style={styles.multiSelect}
          />
  
        <Text style={styles.textSelect1}>Mechanic:</Text>
        <MultiSelect 
          items={[
            {label: 'Any', value: 'Any'},
            {label: 'None', value: null, color:'red'},
            {label: 'Isolation', value: 'isolation', color:'red'},
            {label: 'Compound', value: 'compound' , color:'red'},
          ]}
          displayKey="label"
          uniqueKey="value"
          onSelectedItemsChange={(value) => setMechanic(value)}
          selectedItems={mechanicvalue}
          selectText="Any"
          single={true}
          textInputProps={{ editable: false }}
          searchInputPlaceholderText=""
          searchIcon={false}
          style={styles.multiSelect}
          />    
  
        <Text style={styles.textSelect1}>Muscles:</Text>
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
          textInputProps={{ autoFocus: false }}
          searchInputPlaceholderText="Search Muscles..."
          style={styles.pickerstyle}
          />   
  
        <Text style={styles.textSelect1}>Equipment:</Text>
        <MultiSelect 
          items={[
            {label: 'None', value: null},
            {label: 'Medicine Ball', value: 'medicine ball'},
            {label: 'Dumbbell', value: 'dumbbell'},
            {label: 'Body Only', value: 'body only'},
            {label: 'Bands', value: 'bands'},
            {label: 'Kettlebells', value: 'kettlebells'},
            {label: 'Foam Roll', value: 'foam roll'},
            {label: 'Cable', value: 'cable'},
            {label: 'Machine', value: 'machine'},
            {label: 'Barbell', value: 'barbell'},
            {label: 'Exercise Ball', value: 'exercise ball'},
            {label: 'E-Z Curl Bar', value: 'e-z curl bar'},
            {label: 'Other', value: 'other'},
          ]}
          displayKey="label"
          uniqueKey="value"
          onSelectedItemsChange={(value) => setEquipment(value)}
          selectedItems={equipmentvalue}
          selectText="Select equipments"
          textInputProps={{ autoFocus: false }}
          searchInputPlaceholderText="Search Equipments..."
          style={styles.pickerstyle}
          />    

</CollapsibleView>
    
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : jsonData.length > 0 ? (
          <FlatList
            style={{ flex: 1, marginBottom: 75 }}
            data={filteredItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMovementPress(item)}>
                <View style={{ marginBottom: 10 }}>
                  <Text>{item.name}</Text>
                  <Text style={{textTransform: 'capitalize'}}>{item.level}</Text>
                  <Text style={{textTransform: 'capitalize'}}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text>No data available</Text>
        )}

      <View style={styles.myWorkMovelist}>
        <Button type="outline" title='Profile' onPress={() => navigation.navigate('ProfileStatus')}></Button>
        <Button type="outline" title='My Workout' onPress={() => navigation.navigate('GenerateWorkout')}></Button>
        <Button type="outline" title='Search' onPress={() => navigation.navigate('MoveList')}></Button>
      </View>

      </View>
      
      
    );
  };

  export default MoveList;