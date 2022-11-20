import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ApolloProvider } from '@apollo/react-hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Bell from './assets/icons/Bell';
import Brain from './assets/icons/Brain';
import Casa from './assets/icons/Casa';
import Persona from './assets/icons/Persona';
import Podium from './assets/icons/Podium';
import { client } from './graphql';
import Board from './screens/Board';
import Inicio from './screens/Inicio';
import Logros from './screens/Logros';
import Perfil from './screens/Perfil';
import Quiz from './screens/Quiz';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F1F1F1' }]}>
      <StatusBar
        hidden={false}
        barStyle="light-content"
        backgroundColor="black"
      />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: true,
          headerStyle: {
            borderStyle: 'dotted',
            borderBottomColor: '#7493BA',
            borderBottomWidth: 6,
            backgroundColor: '#6f91be',
            height: 60,
          },
          headerTitleStyle: { color: 'white', fontSize: 30 },
          headerTitleAlign: 'center',

          tabBarStyle: {
            borderRadius: 10,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,

            backgroundColor: '#7493BA',
            height: 70,
          },

          tabBarIcon: () => {
            if (route.name === 'Inicio') {
              return <Casa width={120} height={40} />;
            } else if (route.name === 'Perfil') {
              return <Persona width={120} height={40} />;
            } else if (route.name === 'Quiz') {
              return <Brain width={120} height={40} />;
            } else if (route.name === 'Logros') {
              return <Bell width={120} height={40} />;
            } else if (route.name === 'Ranking') {
              return <Podium width={120} height={40} />;
            }
          },
        })}
      >
        <Tab.Screen name="Inicio" component={Inicio} />
        <Tab.Screen name="Perfil" component={Perfil} />
        <Tab.Screen
          options={{
            tabBarStyle: { display: 'none' },
            headerShown: false,
          }}
          name="Quiz"
          component={Quiz}
        />
        <Tab.Screen name="Logros" component={Logros} />
        <Tab.Screen name="Ranking" component={Board} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <NativeBaseProvider>
            <HomeScreen />
          </NativeBaseProvider>
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
