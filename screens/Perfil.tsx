import { useEffect, useState } from 'react';

import { Avatar, Box, Text, VStack } from 'native-base';

import { useQuery } from '@apollo/react-hooks';
import { ImageBackground, ScrollView, StyleSheet } from 'react-native';

import EstadisticaCard from '../components/EstadisticaCard';
import LevelCard from '../components/LevelCard';
// import Logros from '../components/Logros';
import Logros2 from '../components/Logros2';
import { queries } from '../graphql';

const player = 'david@example.com';

const Perfil = ({ navigation }) => {
  const { data: { users } = {} } = useQuery(queries.ShowUser, {
    variables: {
      email: player,
    },
  });
  const { data: { scorez } = {} } = useQuery(queries.ShowScorez, {
    variables: {
      jugador: player,
    },
  });

  const [correctas, setCorrectas] = useState();
  const [jugadas, setJugadas] = useState();
  const [presicion, setPresicion] = useState();
  const [puntuacion, setPuntuacion] = useState();
  const [velocidad, setVelocidad] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [picture, setPicture] = useState();
  const [partidas, setPartidas] = useState();
  const [plan, setPlan] = useState();
  useEffect(() => {
    if (users) {
      setName(users[0].name);
      setEmail(users[0].email);
      setPicture(users[0].picture);
      setPlan(users[0].plan);
    }
  }, [users]);
  useEffect(() => {
    if (scorez) {
      setCorrectas(scorez[0].correctas);
      setJugadas(scorez[0].jugadas);
      setPresicion(scorez[0].presicion);
      setPuntuacion(scorez[0].puntuacion);
      setVelocidad(scorez[0].velocidad.toFixed(1));
      setPartidas(scorez[0].partidas);
    }
  }, [scorez]);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/fondo1.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        imageStyle={{ opacity: 0.5 }}
      >
        <Box
          w="100%"
          style={{
            backgroundColor: '#f4f4f4',
            paddingTop: 20,

            marginTop: 0,
            marginBottom: 10,
          }}
        >
          <VStack space={1} alignItems="center">
            <Avatar
              size="2xl"
              bg="purple.600"
              alignSelf="center"
              source={{ uri: picture }}
              style={{ marginTop: 20 }}
            />
            <Text fontSize={30} color="#6f91be" fontWeight="bold">
              {name}
            </Text>
            <Text fontSize={18} color="#6f91be">
              {email}
            </Text>
          </VStack>
        </Box>
        <Box
          alignContent={'center'}
          style={{
            backgroundColor: '#be8abc',
            borderRadius: 20,
            paddingTop: 10,
            marginTop: 20,
            marginHorizontal: 20,
          }}
          maxWidth="full"
        >
          <Text
            style={{ fontSize: 20, fontWeight: 'bold' }}
            textAlign={'center'}
          >
            PLAN {plan}
          </Text>
        </Box>
        <Box>
          <LevelCard
            division="Bronce"
            correctas={correctas}
            puntuacion={puntuacion}
            jugadas={jugadas}
            velocidad={velocidad}
            partidas={partidas}
          />
          <EstadisticaCard correctas={correctas} jugadas={jugadas} />
        </Box>
        {/* <Box>
          {correctas && jugadas && partidas && (
            <Logros
              playerStats={{
                correctas,
                jugadas,
                partidas,
              }}
              navigation={navigation}
            />
          )}
        </Box> */}
        <Box>
          <Logros2
            correctas={correctas}
            jugadas={jugadas}
            partidas={partidas}
            navigation={navigation}
          ></Logros2>
        </Box>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    flex: 1,
  },
});
export default Perfil;
