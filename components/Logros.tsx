import { FC, useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from 'native-base';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { NavigationProp } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Ambulancia, Hospital, Jeringa, Silla } from '../assets/icons';
import { mutations, queries } from '../graphql';
import { COLORS } from '../screens/Quiz';
import ModalLogro from './ModalLogro';

type LogrosSpec = {
  [key: string]: {
    description: string;
    icon: (props: SvgProps) => JSX.Element;
    predicate: (stats: PlayerStats) => boolean;
  };
};

type LogrosProps = {
  playerStats: PlayerStats;
  navigation: NavigationProp<'Logros'>;
};

type PlayerStats = {
  jugadas: number;
  partidas: number;
  correctas: number;
};

const LOGROS_SPEC: LogrosSpec = {
  ambulancia: {
    description: 'Completa tu primera partida',
    icon: Ambulancia,
    predicate: (stats: PlayerStats) => stats.partidas > 1,
  },
  jeringa: {
    description: 'Responde 140 preguntas',
    icon: Jeringa,
    predicate: (stats: PlayerStats) => stats.jugadas >= 140,
  },
  silla: {
    description: '50 preguntas correctas',
    icon: Silla,
    predicate: (stats: PlayerStats) => stats.correctas >= 50,
  },
  hospital: {
    description: 'Completa 4 partidas',
    icon: Hospital,
    predicate: (stats: PlayerStats) => stats.partidas >= 4,
  },
};
const PLAYER = 'david@example.com';

const Logros: FC<LogrosProps> = ({ playerStats, navigation }) => {
  console.log('props', playerStats);
  const [myArray3, setmyArray3] = useState([]);
  const [numlogros, setNumlogros] = useState([]);

  const [logro1, setLogro1] = useState<boolean>(false);
  const [logro2, setLogro2] = useState<boolean>(false);
  const [logro3, setLogro3] = useState<boolean>(false);
  const [logro4, setLogro4] = useState<boolean>(false);
  const [logroNuevo, setLogroNuevo] = useState(false);
  const [falsas, setFalsas] = useState<number>();
  const [corre, setCorre] = useState<number>();
  console.log('logronuevo', logroNuevo);
  console.log('numlogros', numlogros);
  console.log('myarr', myArray3);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLogroNuevo(false);
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  useEffect(() => {
    if (myArray3.length === 4) {
      setLogro1(!!myArray3[0][1]);
      setLogro2(!!myArray3[1][1]);
      setLogro3(!!myArray3[2][1]);
      setLogro4(!!myArray3[3][1]);
    }
    if (myArray3.length > 4) {
      setmyArray3([]);
      setNumlogros([]);
    }
  }, [myArray3.length]);

  function getOccurrence() {
    var count = 0;
    if (numlogros != undefined) {
      numlogros.forEach((v) => v === 'true' && count++);
    }
    return count;
  }
  function getOccurrence2() {
    var count = 0;
    if (numlogros != undefined) {
      numlogros.forEach((v) => v === 'false' && count++);
    }
    return count;
  }
  useEffect(() => {
    if (getOccurrence() + getOccurrence2() === 4) {
      setCorre(getOccurrence());

      setFalsas(getOccurrence2());
    }
  }, [getOccurrence]);
  // useEffect(() => {
  //   if (getOccurrence() === 4 - getOccurrence2()) {
  //     setLogroNuevo(true);
  //   }
  // }, [getOccurrence]);
  useEffect(() => {
    if (corre === 4 - falsas && corre != 0) {
      setLogroNuevo(true);
      UpdateLogroz();
      console.log('se subio');
    }
  }, [corre, falsas]);
  console.log('numfalsos', falsas);
  console.log('numverdaderos', corre);

  const [UpdateLogroz] = useMutation(mutations.UpdateLogroz, {
    variables: {
      email: PLAYER,
      logro1,
      logro2,
      logro3,
      logro4,
    },
  });
  // useEffect(() => {
  //   if (logroNuevo) {
  //     UpdateLogroz();
  //     console.log('se subio');
  //   }
  // }, [logroNuevo]);

  return (
    <>
      <Container maxWidth="full" style={styles.container}>
        {playerStats &&
          Object.entries(LOGROS_SPEC).map(([name, spec]) => {
            const value = spec.predicate(playerStats);
            var array = [name, value];
            var includes = myArray3.some((a) =>
              array.every((v, i) => v === a[i])
            );
            if (!includes) {
              myArray3.push([name, value]);
              numlogros.push(value.toString());
            }

            return (
              <View key={name} style={{ flex: 1 }}>
                <Flex direction="row">
                  <HStack>
                    <Box
                      margin={4}
                      borderRadius={10}
                      // borderColor={'white'}
                      // borderWidth={2}
                      shadow="9"
                    >
                      <spec.icon width={120} height={120} />
                    </Box>
                    <VStack>
                      <Box marginTop={12}>
                        <Text style={styles.title}>{name}</Text>

                        <Text style={styles.subtitle}>{spec.description}</Text>
                      </Box>

                      <Box>
                        <Ionicons
                          size={30}
                          name={value ? 'lock-open-outline' : 'lock-closed'}
                          color={value ? COLORS.success : COLORS.error}
                        />
                      </Box>
                    </VStack>
                  </HStack>
                </Flex>
              </View>
            );
          })}
        {/* <Button onPress={() => setNumlogros([])}>
          <Text>GO</Text>
        </Button> */}
        <Text> {getOccurrence()} /4</Text>
      </Container>
      {logroNuevo && <ModalLogro show={true}></ModalLogro>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#7CA1B4',
    backgroundColor: 'white',

    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 4,
    marginHorizontal: 20,

    // alignItems: 'center', // ignore this - we'll come back to it
    //justifyContent: "space-evenly", // ignore this - we'll come back to it
    flexDirection: 'column',
  },
  title: {
    fontSize: 25,
    color: '#be8abc',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Logros;
