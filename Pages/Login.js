import styles from './styles';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, Image, ImageBackground, Keyboard, View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

function Login( {navigation ,route}){
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [yazdir,setYazdir] = useState(' ');
    const uName = (inputUserName) =>{
      setUserName(inputUserName);
      
    }
    const pWord = (inpuPassword)=>{
      setPassword(inpuPassword);
    }
    const son = () =>{
      if(userName==='mehmet' && password==='kabak'){
        console.log('Login Successful.');
        navigation.navigate('GetUserInfo');
  
      }
      else{
        console.log('Login Failed.');
        setYazdir('Username or password is incorrect!');
      }
    }
    return (
      <View style={styles.login} >
        <View style={styles.text}>
          <Text>Username: </Text>
          
          <TextInput
          style={styles.input}
          onChangeText={uName}
          value={userName}
        />
        <Text>Password: </Text>
         <TextInput
          style={styles.input}
          onChangeText={pWord}
          value={password}
          secureTextEntry={true}
        />
        <Text >{yazdir}</Text>
        <Button title='Login' onPress={son}></Button>
        
          
        </View>
      </View>
  
    );
  }
  
export default Login;