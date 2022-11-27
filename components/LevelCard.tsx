import { Ionicons } from '@expo/vector-icons';

import {
  Box,
  Container,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
} from 'native-base';

const LevelCard = ({
  division,
  puntuacion,
  correctas,
  jugadas,
  partidas,
  velocidad,
}) => {
  var points = Math.round(puntuacion);
  var tiempo = Math.round(velocidad);

  return (
    <Container
      maxWidth="full"
      style={{
        backgroundColor: '#be8abc',
        borderRadius: 20,
        paddingTop: 20,
        marginTop: 20,
        marginHorizontal: 20,
      }}
    >
      <VStack alignSelf="center">
        <Flex direction="row">
          <Box>
            <HStack alignSelf="center">
              <Ionicons name="medal-outline" size={40} color="#6f91be" />
              <VStack>
                <Text fontWeight="bold" marginLeft={5} color="white">
                  {division}
                </Text>
                <Text
                  marginLeft={5}
                  marginRight={2}
                  marginBottom={5}
                  color="gray.500"
                >
                  División actual
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Spacer />
          <Box>
            <HStack>
              <Ionicons name="flash-outline" size={40} color="#6f91be" />

              <VStack>
                <Text fontWeight="bold" marginLeft={5} color="white">
                  {points}
                </Text>
                <Text
                  marginLeft={5}
                  marginRight={2}
                  marginBottom={5}
                  color="gray.500"
                >
                  Puntuación
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Flex>
        <Flex direction="row">
          <Box>
            <HStack>
              <Ionicons name="create-outline" size={40} color="#6f91be" />
              <VStack>
                <Text fontWeight="bold" marginLeft={5} color="white">
                  {jugadas}
                </Text>
                <Text
                  marginLeft={5}
                  marginRight={2}
                  marginBottom={5}
                  color="gray.500"
                >
                  Jugadas
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Spacer />
          <Box>
            <HStack>
              <Ionicons
                name="checkmark-circle-outline"
                size={40}
                color="#6f91be"
              />
              <VStack>
                <Text fontWeight="bold" marginLeft={5} color="white">
                  {correctas}
                </Text>
                <Text
                  marginLeft={5}
                  marginRight={2}
                  marginBottom={5}
                  color="gray.500"
                >
                  Correctas
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Flex>
        <Flex direction="row">
          <Box>
            <HStack>
              <Ionicons name="time-outline" size={40} color="#6f91be" />
              <VStack>
                <Text fontWeight="bold" marginLeft={5} color="white">
                  {tiempo}
                </Text>
                <Text
                  marginLeft={5}
                  marginRight={2}
                  marginBottom={5}
                  color="gray.500"
                >
                  Velocidad
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Spacer />
          <Box>
            <HStack>
              <Ionicons name="play-circle-outline" size={40} color="#6f91be" />

              <VStack>
                <Text fontWeight="bold" marginLeft={5} color="white">
                  {partidas}
                </Text>
                <Text
                  marginLeft={5}
                  marginRight={2}
                  marginBottom={5}
                  color="gray.500"
                >
                  Partidass
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Flex>
      </VStack>
      {/* <Center w="100%">
        <Box w="90%" maxW="400">
          <Flex direction="row">
            <Ionicons name="ios-medal" size={40} color="#BE8325" />
            <VStack>
              <Text fontWeight="bold" marginLeft={5} color="white">
                {division}
              </Text>
              <Text
                marginLeft={5}
                marginRight={2}
                marginBottom={5}
                color="gray.500"
              >
                División actual
              </Text>
            </VStack>

            <Divider my="-2" orientation="vertical" />
            <Box marginLeft={5}>
              <HStack>
                <Ionicons name="ios-flash" size={40} color="#FACB48" />

                <VStack>
                  <Text fontWeight="bold" marginLeft={5} color="white">
                    {points}
                  </Text>
                  <Text
                    marginLeft={5}
                    marginRight={2}
                    marginBottom={5}
                    color="gray.500"
                  >
                    Puntuación
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Flex>
        </Box>
        <Box w="90%" maxW="400">
          <Flex direction="row">
            <Ionicons name="ios-create" size={40} color="#EE4884" />
            <VStack>
              <Text fontWeight="bold" marginLeft={5} color="white">
                {jugadas}
              </Text>
              <Text
                marginLeft={5}
                marginRight={2}
                marginBottom={5}
                color="gray.500"
              >
                Jugadas
              </Text>
            </VStack>

            <Divider my="-2" orientation="vertical" />
            <Box marginLeft={5}>
              <HStack>
                <Ionicons
                  name="ios-checkmark-circle"
                  size={40}
                  color="#3DAB39"
                />
                <VStack>
                  <Text fontWeight="bold" marginLeft={5} color="white">
                    {correctas}
                  </Text>
                  <Text marginLeft={5} marginRight={2} color="gray.500">
                    Correctas
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Flex>
        </Box>

        <Box w="90%" maxW="400">
          <Flex direction="row">
            <Ionicons name="ios-time" size={40} color="#48CBEE" />
            <VStack>
              <Text fontWeight="bold" marginLeft={5} color="white">
                {tiempo} seg
              </Text>
              <Text
                marginLeft={5}
                marginRight={2}
                marginBottom={5}
                color="gray.500"
              >
                Velocidad
              </Text>
            </VStack>

            <Divider my="-2" orientation="vertical" />
            <Box marginLeft={5}>
              <HStack>
                <Ionicons name="ios-play-circle" size={40} color="#A433C9" />
                <VStack>
                  <Text fontWeight="bold" marginLeft={5} color="white">
                    {partidas}
                  </Text>
                  <Text marginLeft={5} marginRight={2} color="gray.500">
                    Partidas
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Flex>
        </Box>
      </Center> */}
    </Container>
  );
};

export default LevelCard;
