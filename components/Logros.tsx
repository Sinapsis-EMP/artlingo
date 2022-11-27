import React, { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { useFonts } from 'expo-font';
import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from 'native-base';

import { Ambulancia, Hospital, Jeringa, Silla } from '../assets/icons';
import { mutations, queries } from '../graphql';
import ModalLogro from './ModalLogro';

const player = 'marco@example.com';

const Logros = ({ jugadas, partidas, correctas, navigation }) => {
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLogroNuevo(false);
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);
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
    if (partidas === 2 && logro1 === false) {
      setLogro1(true);
      setLogroNuevo(true);
    }
    if (jugadas === 130 && logro2 === false) {
      setLogro2(true);
      setLogroNuevo(true);
    }
    if (correctas === 60 && logro3 === false) {
      setLogro3(true);
      setLogroNuevo(true);
    }
    if (jugadas === 150 && logro4 === false) {
      setLogro4(true);
      setLogroNuevo(true);
    }
  }, [jugadas, partidas, correctas]);

  useEffect(() => {
    if (logroNuevo === true) {
      UpdateLogroz();
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
      <Container
        maxWidth="full"
        style={{
          backgroundColor: '#6f91be',
          borderRadius: 20,

          marginHorizontal: 20,
        }}
      >
        <Flex>
          <HStack space={4}>
            <Box>
              <Ambulancia width={120} height={120} />
            </Box>
            <VStack alignSelf="center">
              <Box>
                <Text
                  style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}
                >
                  Ambulancia
                </Text>
              </Box>
              <Box>
                <Text style={{ fontSize: 15, color: 'black' }}>
                  Completa 2 partidas
                </Text>
              </Box>
            </VStack>
            {logro1 ? (
              <>
                <Box alignSelf="center">
                  <Ionicons name="lock-open" size={40} color="green" />
                </Box>
              </>
            ) : (
              <Box alignSelf="center">
                <Ionicons name="lock-closed" size={40} color="grey" />
              </Box>
            )}
          </HStack>
        </Flex>
        <Divider></Divider>
        <Flex>
          <HStack space={4}>
            <Box>
              <Jeringa width={120} height={120} />
            </Box>
            <VStack alignSelf="center">
              <Box>
                <Text
                  style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}
                >
                  Jeringa
                </Text>
              </Box>
              <Box>
                <Text style={{ fontSize: 15, color: 'black' }}>
                  Completa 130 Jugadas
                </Text>
              </Box>
            </VStack>
            {logro2 ? (
              <>
                <Box alignSelf="center">
                  <Ionicons name="lock-open" size={40} color="green" />
                </Box>
              </>
            ) : (
              <Box alignSelf="center">
                <Ionicons name="lock-closed" size={40} color="grey" />
              </Box>
            )}
          </HStack>
        </Flex>
        <Divider></Divider>

        <Flex>
          <HStack space={4}>
            <Box>
              <Silla width={120} height={120} />
            </Box>
            <VStack alignSelf="center">
              <Box>
                <Text
                  style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}
                >
                  Silla
                </Text>
              </Box>
              <Box>
                <Text style={{ fontSize: 15, color: 'black' }}>
                  Completa 60 correctas
                </Text>
              </Box>
            </VStack>
            {logro3 ? (
              <>
                <Box alignSelf="center">
                  <Ionicons name="lock-open" size={40} color="green" />
                </Box>
              </>
            ) : (
              <Box alignSelf="center">
                <Ionicons name="lock-closed" size={40} color="grey" />
              </Box>
            )}
          </HStack>
        </Flex>
        <Divider></Divider>

        <Flex>
          <HStack space={4}>
            <Box>
              <Hospital width={120} height={120} />
            </Box>
            <VStack alignSelf="center">
              <Box>
                <Text
                  style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}
                >
                  Hospital
                </Text>
              </Box>
              <Box>
                <Text style={{ fontSize: 15, color: 'black' }}>
                  Completa 350 Jugadas
                </Text>
              </Box>
            </VStack>
            {logro4 ? (
              <>
                <Box alignSelf="center">
                  <Ionicons name="lock-open" size={40} color="green" />
                </Box>
              </>
            ) : (
              <Box alignSelf="center">
                <Ionicons name="lock-closed" size={40} color="grey" />
              </Box>
            )}
          </HStack>
        </Flex>
      </Container>
      {logroNuevo && <ModalLogro show={true}></ModalLogro>}
    </>
  );
};

export default Logros;
