import React,{useState} from 'react';
import { Text, TextInput, View, Button, useWindowDimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

function HomeScreen({ navigation }) {


  const windowWidth= useWindowDimensions().width;
  return(
    
    <View>
        <View>
        <TouchableOpacity
          style={styles.Button}
          onPress={() =>navigation.navigate("Signup")}
        >
          <Text style={styles.TextStyle}> SIGN UP </Text>
            
          </TouchableOpacity>
  
    </View>
    <View>
        <TouchableOpacity
          style={styles.Button1}
          onPress={() =>navigation.navigate("Login")}
        >
          <Text style={styles.TextStyle}> LOGIN </Text>
            
          </TouchableOpacity>
  
    </View>

    </View>
  
  )
}
const styles = StyleSheet.create({
  
  Button: {

    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'yellow'
  },
Button1:{
  height:40,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'yellow'

},
 
  TextStyle:{
      color:'blue',
      textAlign:'center',
      fontSize:20
    
  }
})


function Signup({ navigation }) {
  function pass(){
    console.log("signup email=",email);
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((ref) => {
      console.log(ref);
      console.log('User account created & signed in!');
      navigation.navigate("Login");
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.log(error);
    });
  }
  const [email, setEmail] = useState('');
  const [fullname, setfullName] = useState('');
  const [password, setPassword] = useState('');
  const windowWidth= useWindowDimensions().width;
  return(

    <View style={{ backgroundColor: 'green',flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text Style={{fontsize: 30}}>Enter email</Text>
      <TextInput
      label="email"
      value={email}
      style={{
        height: 40, borderColor: 'yellow', borderWidth: 1, width: 250, borderRadius: 10, backgroundColor: 'blue'
      }}
      onChangeText={text => setEmail(text)}
      value={email}
    />

      <Text>Enter fullname</Text>
      <TextInput
      label="fullname"
      value={fullname}
      style={{
        height: 40, borderColor: 'yellow', borderWidth: 1, width: 250, borderRadius: 10, backgroundColor: 'blue'
      }}
      onChangeText={text => setfullName(text)}
      value={fullname}
    />
     <Text>Enter password</Text>
     <TextInput
     label="password"
     value={password}
     style={{
      height: 40, borderColor: 'yellow', borderWidth: 1, width: 250, borderRadius: 10, backgroundColor: 'blue'
    }}
     onChangeText={text => setPassword(text)}
     value={password}
    />

    <Button title="SIGN UP" onPress={() => pass()} />
    </View>
  );
}

function Login({ navigation }) {
 function signin(){
  console.log("email=",email);
  auth()
  .signInWithEmailAndPassword(email.trim(), password)
  .then((ref) => {
    console.log(ref);
    
    
    console.log('User sign in successful');
    navigation.push("Display",{email});
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log(ref);
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.log(error);
  });
}
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const windowWidth= useWindowDimensions().width;
  return(

    <View style={{ backgroundColor: 'green',flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text Style={{fontsize: 30}}>Enter email</Text>
      <TextInput
      label="email"
      value={email}
      style={{
        height: 40, borderColor: 'yellow', borderWidth: 1, width: 250, borderRadius: 10, backgroundColor: 'blue'
      }}
      onChangeText={text => setEmail(text)}
      
    />
     <Text>Enter password</Text>
     <TextInput
     label="password"
     value={password}
     style={{
      height: 40, borderColor: 'yellow', borderWidth: 1, width: 250, borderRadius: 10, backgroundColor: 'blue'
    }}
     onChangeText={text => setPassword(text)}
     value={password}
    />

    <Button title="LOGIN" onPress={() => signin()} />
    </View>
  );
}


function DisplayScreen(route){
  console.log(route)
  let data= route.params
  return(
    <View style={{ backgroundColor: 'green',flex: 1, justifyContent: "center", alignItems: "center" }}>

<Text Style={{fontsize: 30}}>Congratulations {route.route.params.email} you are registered successfully</Text>  
    </View>

  );
}
 

const Stack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}
        options={{
          title:'HOME',
          headerstyle:{backgroundColor:'blue'},
          headerTintColor:'blue',
          headerTintStyle:{
            fontWeight:'bold',
            fontSize:20
          }

        }}/>
        <Stack.Screen name="Signup" component={Signup}
        options={{
          title:'SIGNUP',
          headerstyle:{backgroundColor:'blue'},
          headerTintColor:'blue',
          headerTintStyle:{
            fontWeight:'bold',
            fontSize:20
          }

        }}/>

        <Stack.Screen name="Login" component={Login}
        options={{
          title:'LOGIN',
          headerstyle:{backgroundColor:'blue'},
          headerTintColor:'blue',
          headerTintStyle:{
            fontWeight:'bold',
            fontSize:20
          }

        }}/>         
        <Stack.Screen name="Display" component={DisplayScreen}
        options={{
          title:'Display',
          headerstyle:{backgroundColor:'blue'},
          headerTintColor:'blue',
          headerTintStyle:{
            fontWeight:'bold',
            fontSize:40
          }

        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;


