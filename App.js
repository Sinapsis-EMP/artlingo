import { StyleSheet,StatusBar} from 'react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './graphql';
import { useFonts } from 'expo-font';
import Inicio from './screens/Inicio.js';
import Perfil from './screens/Perfil.js';
import Logros from './screens/Logros.js';
import Board from './screens/Board.js';
import Quiz from './screens/Quiz.js';

const Tab = createBottomTabNavigator();

function HomeScreen() {
 
  // const [fontsLoaded] = useFonts({
  //   'Gotika-Regular': require('./assets/fonts/Gotika-Regular.otf'),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#F1F1F1" }]}>
      <StatusBar hidden={false}  barStyle="light-content" backgroundColor="black" />

    <Tab.Navigator

    screenOptions={({ route }) => ({
   

      
     
      

      tabBarShowLabel:false,
      headerShown:true,
      headerStyle:{   borderStyle: "dotted" , borderBottomColor:"#7493BA", borderBottomWidth:6, backgroundColor:"#F1F1F1" ,height:60},
      headerTitleStyle:{  color:"#BE8ABC" ,fontSize:30},
      headerTitleAlign:"center",
  
      tabBarStyle:{borderRadius:10, backgroundColor:"#7493BA" ,height:70 },
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
    
     if (route.name === 'Inicio') {
        iconName = focused
        ? 'ios-home'
        : 'ios-home-outline';
        size=40
        color=focused ? 'white' : "white"
        
      } else if (route.name === 'Perfil') {
        iconName = focused
        ? 'ios-person'
        : 'ios-person-outline';
        size=40
        color=focused ? 'white' : "white"

      

      }
      else if (route.name === 'Quiz') {
        iconName = focused
        ? 'ios-school'
        : 'ios-school';
        size=60
        color=focused ? '#e91e63' : "#e91e63"

      

      } else if (route.name === 'Logros') {
        iconName = focused
        ? 'ios-notifications'
        : 'ios-notifications-outline';
        size=40
        color=focused ? 'white' : "white"

       

      }else if (route.name === 'Board') {
        iconName = focused
        ? 'ios-podium'
        : 'ios-podium-outline';
        size=40
        color=focused ? 'white' : "white"

      }
return <Ionicons name={iconName} size={size} color={color}/>


}, 
        
      })}
      
     
    >
        <Tab.Screen name="Inicio" component={Inicio} />
        <Tab.Screen name="Perfil" component={Perfil} />
        <Tab.Screen  options={{
            tabBarStyle: { display: "none" },
            headerShown:false,
          }} name="Quiz" component={Quiz} />
        <Tab.Screen name="Logros" component={Logros} />
        <Tab.Screen name="Board" component={Board} />
    </Tab.Navigator>
    </SafeAreaView>
  );
 }

const styles = StyleSheet.create({
  container: { flex: 1,},
});

export default function App() {

  return ( <SafeAreaProvider>
        <ApolloProvider client={client}>

    <NavigationContainer>
  
    <NativeBaseProvider>

        <HomeScreen></HomeScreen>
     
      </NativeBaseProvider>
     
    </NavigationContainer>
    </ApolloProvider>
    </SafeAreaProvider>
    
  )
}
