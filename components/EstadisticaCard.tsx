import React from 'react';

import {
  Box,
  Center,
  Container,
  Flex,
  Progress,
  Spacer,
  Text,
  VStack,
} from 'native-base';

const EstadisticaCard = ({ correctas, jugadas }) => {
  var porcentaje = Math.round((correctas / jugadas) * 100);

  return (
    <Container
      maxWidth="full"
      marginHorizontal={20}
      style={{
        backgroundColor: 'white',
        paddingTop: 20,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <Center w="100%">
        <Box w="90%" maxW="400">
          <VStack space="md">
            <VStack mx="4" space="md">
              {/* <Flex direction="row">
            
          
            <Text>Preguntas/jugadas</Text>
            <Spacer></Spacer>
            <Text>{scores?.jugadas}</Text>
           
            </Flex>
            <Progress colorScheme="secondary" value={scores?.jugadas} /> */}
              {/* <Flex direction="row">
            
            <Text>Correctas</Text>
            <Spacer></Spacer>
            <Text>{scores?.correctas}</Text>
           
            </Flex>
            <Progress colorScheme="emerald" value={scores?.correctas} /> */}
              <Flex direction="row">
                <Text>Presición</Text>
                <Spacer></Spacer>
                <Text>{porcentaje}%</Text>
              </Flex>
              <Progress
                marginBottom={10}
                colorScheme="emerald"
                value={porcentaje}
              />
              {/* <Flex direction="row">
            
            <Text>Promedio Velocidad</Text>
            <Spacer></Spacer>
            <Text>{tiempo} Segundos</Text>
           
            </Flex>
            <Progress colorScheme="emerald" value={tiempo} /> */}
            </VStack>
          </VStack>
        </Box>
      </Center>
    </Container>
  );
};

export default EstadisticaCard;
