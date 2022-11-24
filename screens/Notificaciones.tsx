import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { mutations, queries } from '../graphql';

export const COLORS = {
  primary: '#252c4a',
  secondary: '#1E90FF',
  accent: '#3498db',

  success: '#00C851',
  error: '#ff4444',

  black: '#171717',
  white: '#FFFFFF',
  background: '#252C4A',
};
const Notificaciones = () => {
  const [jugadas, setJugadas] = useState(170);
  const [correctas, setCorrectas] = useState(71);
  const [presicion, setPresicion] = useState(0);
  const [velocidad, setVelocidad] = useState(4);
  const [partidas, setPartidas] = useState();
  const [puntuacion, setPuntuacion] = useState(0);

  useEffect(() => {
    if (correctas && jugadas) {
      setPresicion(Number(((correctas * 100) / jugadas / 100).toFixed(2)));
    }
  }, [correctas, jugadas]);
  useEffect(() => {
    if (presicion && velocidad) {
      setPuntuacion(
        ((jugadas * Math.pow(presicion, 2.5)) /
          Math.pow(Math.round(velocidad), 2)) *
          100
      );
    }
  }, [correctas, jugadas, presicion, velocidad]);
  console.log('velo' + Math.round(velocidad));
  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>Preguntas Jugadas</Text>
        <Text>{jugadas}</Text>

        <Text>Preguntas Correctas</Text>
        <Text>{correctas}</Text>

        <Text>Presición</Text>
        <Text>{presicion}</Text>
        <Text>Tiempo</Text>
        <Text>{velocidad}</Text>

        <Text>Puntuación</Text>
        <Text>{Math.round(puntuacion)}</Text>
      </View>
    </>
  );
};
export default Notificaciones;
