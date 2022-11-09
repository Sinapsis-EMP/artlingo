import React, { useState } from 'react';
import { useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Avatar, Box, Text, VStack } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';

import EstadisticaCard from '../components/EstadisticaCard.js';
import LevelCard from '../components/LevelCard.js';
import { queries } from '../graphql';

const player = 'marco@example.com';

const Perfil = () => {
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
  // const {    data: { partidas } = {}  }= useQuery(queries.ShowPartidas, {
  //   variables: {
  //    email:player

  //   },
  // });
  const [correctas, setCorrectas] = useState();
  const [jugadas, setJugadas] = useState();
  const [presicion, setPresicion] = useState();
  const [puntuacion, setPuntuacion] = useState();
  const [velocidad, setVelocidad] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [picture, setPicture] = useState();
  const [partidas, setPartidas] = useState();

  useEffect(() => {
    if (users) {
      setName(users[0].name);
      setEmail(users[0].email);
      setPicture(users[0].picture);
    }
  }, [users]);
  useEffect(() => {
    if (scorez) {
      setCorrectas(scorez[0].correctas);
      setJugadas(scorez[0].jugadas);
      setPresicion(scorez[0].presicion);
      setPuntuacion(scorez[0].puntuacion);
      setVelocidad(scorez[0].velocidad);
      setPartidas(scorez[0].partidas);
    }
  }, [scorez]);

  return (
    <ScrollView style={styles.container}>
      <Box
        w="100%"
        style={{
          backgroundColor: '#7493BA',
          paddingTop: 20,
          borderRadius: 30,
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <VStack space={1} alignItems="center">
          <Avatar
            size="2xl"
            bg="purple.600"
            alignSelf="center"
            source={{
              uri: picture,
            }}
            style={{ marginTop: 20 }}
          ></Avatar>
          <Text fontSize={30} color={'white'} fontWeight="bold">
            {name}
          </Text>
          <Text fontSize={18} color={'white'}>
            {email}
          </Text>
        </VStack>
      </Box>

      <Box>
        <LevelCard
          division={'bronce'}
          correctas={correctas}
          puntuacion={puntuacion}
          jugadas={jugadas}
          velocidad={velocidad}
          partidas={partidas}
        ></LevelCard>
        <EstadisticaCard
          correctas={correctas}
          jugadas={jugadas}
        ></EstadisticaCard>
      </Box>
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
