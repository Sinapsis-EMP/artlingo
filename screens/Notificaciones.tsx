import { useEffect, useState } from 'react';

import { Text, View } from 'react-native';

import { COLORS } from './Quiz';

const Notificaciones = () => {
  const [jugadas, setJugadas] = useState(140);
  const [correctas, setCorrectas] = useState(60);
  const [presicion, setPresicion] = useState(0);
  const [velocidad, setVelocidad] = useState(3);
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
