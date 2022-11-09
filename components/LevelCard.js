import React from "react";
import { Ionicons } from '@expo/vector-icons';

import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider,Avatar,VStack,Flex,Container,Spacer,Progress,Divider } from "native-base";
const LevelCard = ({division ,puntuacion,correctas,jugadas,partidas ,velocidad}) => {
  var points = Math.round (puntuacion);
  var tiempo = Math.round(velocidad)

  return(
 <Container maxWidth="full" marginHorizontal={20} style={{backgroundColor:"black", paddingTop:20, borderRadius:20 ,marginTop:20 ,marginBottom:10}}>
<Center w="100%">
      <Box w="90%" maxW="400">
            <Flex direction="row">
    
        <Ionicons name="ios-medal" size={40} color="#BE8325"/>

            <VStack>
            <Text fontWeight={"bold"}  marginLeft={5} color ="white">{division}</Text>
            <Text   marginLeft={5} marginRight={2} marginBottom={5} color ="gray.500">División actual</Text>
            </VStack>
            
            <Divider my="-2" orientation="vertical" />
<Box marginLeft={5}>
<HStack>
<Ionicons name="ios-flash" size={40} color="#FACB48"/>

            <VStack>

            <Text  fontWeight={"bold"} marginLeft={5}color ="white">{points}</Text>
            <Text     marginLeft={5} marginRight={2} marginBottom={5} color ="gray.500">Puntuación</Text>

            </VStack>
            </HStack>

            </Box>
            </Flex>

            </Box>
             <Box w="90%" maxW="400">
            <Flex direction="row">
            
            <Ionicons name="ios-create" size={40} color="#EE4884"/>
            <VStack>
            <Text fontWeight={"bold"}  marginLeft={5} color ="white">{jugadas}</Text>
            <Text      marginLeft={5} marginRight={2} marginBottom={5} color ="gray.500">Jugadas           </Text>
            </VStack>
            
            <Divider my="-2" orientation="vertical" />
<Box marginLeft={5}>
<HStack>
<Ionicons name="ios-checkmark-circle" size={40} color="#3DAB39" />

            <VStack>

            <Text  fontWeight={"bold"} marginLeft={5}color ="white">{correctas}</Text>
            <Text   marginLeft={5}  marginRight={2} color ="gray.500">Correctas</Text>

            </VStack>
            </HStack>

            </Box>
            </Flex>
            </Box> 
            <Box w="90%" maxW="400">
            <Flex direction="row">
            
            <Ionicons name="ios-time" size={40} color="#48CBEE"/>
            <VStack>
            <Text fontWeight={"bold"}  marginLeft={5} color ="white">{tiempo} seg</Text>
            <Text   marginLeft={5} marginRight={2} marginBottom={5} color ="gray.500">Velocidad        </Text>
            </VStack>
            
            <Divider my="-2" orientation="vertical" />
<Box marginLeft={5}>
<HStack>
<Ionicons name="ios-play-circle" size={40} color="#A433C9"/>

            <VStack>

            <Text  fontWeight={"bold"} marginLeft={5}color ="white">{partidas}</Text>
            <Text   marginLeft={5}  marginRight={2} color ="gray.500">Partidas</Text>

            </VStack>
            </HStack>

            </Box>
            </Flex>
            </Box> 

  
  
    </Center>
   
             </Container>
             
                   




      
       

  )
};

    export default LevelCard
    