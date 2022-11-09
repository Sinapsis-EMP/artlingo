import React from 'react';
import {
  Box,
  Heading,
  Avatar,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  VStack,
  Container,
} from 'native-base';
import { useFonts } from 'expo-font';
const Categorias = ({ picture, nombre }) => {
  const [fontsLoaded] = useFonts({
    'Gotika-Regular': require('../assets/fonts/Gotika-Regular.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Box marginTop={50}>
      <VStack space={4}>
        <Avatar
          bg="#F1F1F1"
          size="2xl"
          alignSelf="center"
          source={picture}
        ></Avatar>

        <Box alignSelf="center">
          <Text color={'#BE8ABC'} fontFamily="Gotika-Regular" fontSize={22}>
            {nombre}
          </Text>
        </Box>
        <Box marginTop={-3} borderColor={'#A28787'} borderWidth={1}>
          <Text color={'#7493BA'} fontSize={15} textAlign={'center'}>
            50 preguntas
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Categorias;
