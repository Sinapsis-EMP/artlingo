import React, { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Modal,
  Spacer,
  Text,
  VStack,
} from 'native-base';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { StyleSheet, View } from 'react-native';

import { Ambulancia, Hospital, Jeringa, Silla } from '../assets/icons';
import { mutations, queries } from '../graphql';
import { COLORS } from '../screens/Quiz';
import ModalLogro from './ModalLogro';

const player = 'david@example.com';

const Logros2 = ({ jugadas, partidas, correctas, navigation }) => {
  const { data: { logroz } = {} } = useQuery(queries.ShowLogroz, {
    variables: {
      email: player,
    },
  });

  const [logro1, setLogro1] = useState<boolean>();
  const [logro2, setLogro2] = useState<boolean>();
  const [logro3, setLogro3] = useState<boolean>();
  const [logro4, setLogro4] = useState<boolean>();
  const [logroNuevo, setLogroNuevo] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLogroNuevo(false);
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/success.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
          console.log('uploadSound');
        }
      : undefined;
  }, [sound]);
  useEffect(() => {
    if (logroz) {
      setLogro1(logroz[0].logro1);
      setLogro2(logroz[0].logro2);
      setLogro3(logroz[0].logro3);
      setLogro4(logroz[0].logro4);
    }
  }, [logroz]);
  const [UpdateLogroz] = useMutation(mutations.UpdateLogroz, {
    variables: {
      email: player,
      logro1: logro1,
      logro2: logro2,
      logro3: logro3,
      logro4: logro4,
    },
  });

  useEffect(() => {
    if (partidas >= 2 && logro1 === false) {
      setLogro1(true);
      setLogroNuevo(true);
    }
    if (jugadas >= 140 && logro2 === false) {
      setLogro2(true);
      setLogroNuevo(true);
    }
    if (correctas >= 50 && logro3 === false) {
      setLogro3(true);
      setLogroNuevo(true);
    }
    if (partidas >= 4 && logro4 === false) {
      setLogro4(true);
      setLogroNuevo(true);
    }
  }, [jugadas, partidas, correctas]);

  useEffect(() => {
    if (logroNuevo === true) {
      UpdateLogroz();
      playSound();
    }
  }, [logroNuevo]);
  const [fontsLoaded] = useFonts({
    'Gotika-Regular': require('../assets/fonts/Gotika-Regular.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Container maxWidth="full" style={styles.container}>
        <View style={{ flex: 1 }}>
          <Flex direction="row">
            <HStack>
              <Box
                margin={4}
                borderRadius={10}
                // borderColor={'white'}
                // borderWidth={2}
                shadow="9"
              >
                <Ambulancia width={120} height={120} />
              </Box>
              <VStack>
                <Box marginTop={12}>
                  <Text style={styles.title}>Ambulancia</Text>

                  <Text style={styles.subtitle}>
                    Completa tu primera partida
                  </Text>
                </Box>

                <Box>
                  <Ionicons
                    size={30}
                    name={logro1 ? 'lock-open-outline' : 'lock-closed'}
                    color={logro1 ? COLORS.success : COLORS.error}
                  />
                </Box>
              </VStack>
            </HStack>
          </Flex>
          <Divider></Divider>
          <Flex direction="row">
            <HStack>
              <Box
                margin={4}
                borderRadius={10}
                // borderColor={'white'}
                // borderWidth={2}
                shadow="9"
              >
                <Jeringa width={120} height={120} />
              </Box>
              <VStack>
                <Box marginTop={12}>
                  <Text style={styles.title}>Jeringa</Text>

                  <Text style={styles.subtitle}>Responde 140 preguntas</Text>
                </Box>

                <Box>
                  <Ionicons
                    size={30}
                    name={logro2 ? 'lock-open-outline' : 'lock-closed'}
                    color={logro2 ? COLORS.success : COLORS.error}
                  />
                </Box>
              </VStack>
            </HStack>
          </Flex>
          <Divider></Divider>

          <Flex direction="row">
            <HStack>
              <Box
                margin={4}
                borderRadius={10}
                // borderColor={'white'}
                // borderWidth={2}
                shadow="9"
              >
                <Silla width={120} height={120} />
              </Box>
              <VStack>
                <Box marginTop={12}>
                  <Text style={styles.title}>Silla</Text>

                  <Text style={styles.subtitle}>50 preguntas correctas</Text>
                </Box>

                <Box>
                  <Ionicons
                    size={30}
                    name={logro3 ? 'lock-open-outline' : 'lock-closed'}
                    color={logro3 ? COLORS.success : COLORS.error}
                  />
                </Box>
              </VStack>
            </HStack>
          </Flex>
          <Divider></Divider>

          <Flex direction="row">
            <HStack>
              <Box
                margin={4}
                borderRadius={10}
                // borderColor={'white'}
                // borderWidth={2}
                shadow="9"
              >
                <Hospital width={120} height={120} />
              </Box>
              <VStack>
                <Box marginTop={12}>
                  <Text style={styles.title}>Hospital</Text>

                  <Text style={styles.subtitle}>Completa 4 partidas</Text>
                </Box>

                <Box>
                  <Ionicons
                    size={30}
                    name={logro4 ? 'lock-open-outline' : 'lock-closed'}
                    color={logro4 ? COLORS.success : COLORS.error}
                  />
                </Box>
              </VStack>
            </HStack>
          </Flex>
        </View>
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

export default Logros2;
