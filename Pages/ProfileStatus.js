import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, Platform, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


function ProfileStatus ({ navigation, route }) {
  const [profileImage, setProfileImage] = useState();
  const [varname, setNewName] = useState('DEFAULT NAME');
  
  const nameInput = (varName) => {
    setNewName(varName);
  }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
  
    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.settings}> PROFILE </Text>

      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: profileImage }} style={styles.image} />
      </TouchableOpacity>
     
        <TextInput style = {styles.headermid2}>DEFAULT NAME</TextInput>
        

      <View style={styles.row}>
        <Text style={styles.header}>CURRENT BMI: 24</Text>
        
        <Text style={styles.headerrigth}>CURRENT WEIGHT: 80</Text>
      </View>

      {/* <View style={styles.row}>
        <Text style={styles.header}>HEIGHT: {} </Text>
        <Text style={styles.headerrigth}>GENDER: {}</Text>
      </View> */}

      <View style={styles.myWorkmainMenu}>
        <Button type="outline" title='Profile' onPress={() => navigation.navigate('ProfileStatus')}></Button>
        <Button type="outline" title='My Workout' onPress={() => navigation.navigate('GenerateWorkout')}></Button>
        <Button type="outline" title='Search' onPress={() => navigation.navigate('MoveList')}></Button>
      </View>
      
    </View>
  );
};

export default ProfileStatus;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    flex: 1
  },
  container: {
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 40,
    margin: 10,
  },
  settingsContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    margin: 10,
  },
  image: {
    alignSelf: 'center',
    aspectRatio: 1,
    height: 200,
    marginTop: 100,
    marginBottom: 30,
    borderRadius:100,
  },
  settings: {
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 27,
    color: 'black',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'purple',
    marginTop: 20,
    marginBottom: 50,
    fontWeight: 'bold',
  },
  headermid: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    color: 'purple',
    marginTop: 20,
    marginBottom: 100,
    fontWeight: 'bold',
  },
  headermid2: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom : 40,
    color: 'grey',
    fontWeight: 'bold',
  },
  headerrigth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    fontSize: 18,
    color: 'purple',
    marginTop: 20,
    marginBottom: 50,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align children vertically
    marginTop: 20,
  },
  
  buttonStlye: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'red',
    flex: 1,
  },
  myWorkmainMenu:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute', 
    bottom: 20, 
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    marginBottom:-70,
    paddingBottom: 0 // Add paddingBottom to create space between the buttons and the bottom edge
  }
});