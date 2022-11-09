import { StyleSheet, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './graphql';
import Inicio from './screens/Inicio.js';
import Perfil from './screens/Perfil.js';
import Logros from './screens/Logros.js';
import Board from './screens/Board.js';
import Quiz from './screens/Quiz.js';
import Brain from './assets/icons/brain.svg';
import Podium from './assets/icons/podium.svg';
import Bell from './assets/icons/bell.svg';
import Persona from './assets/icons/persona.svg';
import Casa from './assets/icons/casa.svg';

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
            backgroundColor: '#F1F1F1',
            height: 60,
          },
          headerTitleStyle: { color: '#BE8ABC', fontSize: 30 },
          headerTitleAlign: 'center',

          tabBarStyle: {
            borderRadius: 10,
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
            } else if (route.name === 'Board') {
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
        <Tab.Screen name="Board" component={Board} />
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
            <HomeScreen></HomeScreen>
          </NativeBaseProvider>
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
