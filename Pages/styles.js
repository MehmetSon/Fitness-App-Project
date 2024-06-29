import { StyleSheet } from 'react-native';

  const styles = StyleSheet.create({
      
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    multiSelect: {
      width: '100%',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
     
    container: {
      flex:1,
      backgroundColor: 'black',
      
     
    },
    login:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      
      
    },
    mainCark:{
      position: 'absolute', // Mutlak konumlandırma
      top: 1, // Üst kenardan 20 birim uzaklık
      right: 2,
    },
    myWorkmainMenu:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'relative',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingTop: 530,
    },  profmainMenu:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'relative',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingTop: 630,
    },
    myWorkMovelist:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute', // Use absolute positioning
      bottom: 0, // Align at the bottom
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingBottom: 20, // Add padding to create space between buttons and screen edge
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

  export default styles;