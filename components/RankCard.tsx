import { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { Avatar, Box, HStack, Text, VStack, View } from 'native-base';

const RankCard = ({ nombre, score, pre_rank, picture, email }) => {
  const [logok, setLogok] = useState('arrow-up');
  const [kolor, setKolor] = useState('#97c59e');
  useEffect(() => {
    if (email === 'mariana@example.com') {
      setLogok('arrow-up');
      setKolor('#97c59e');
    }
    if (email === 'arturo@example.com') {
      setLogok('arrow-up');
      setKolor('#e6c643');
    }
    if (email === 'david@example.com') {
      setLogok('arrow-up');
      setKolor('#e6c643');
    }

    if (email === 'marco@example.com') {
      setLogok('arrow-down');
      setKolor('#c69ec7');
    }
    if (email === 'jorge@example.com') {
      setLogok('arrow-up');
      setKolor('#e6c643');
    }
  }, [email]);

  var puntuacion = Math.round(score);
  return (
    <>
      <View alignSelf="center" marginBottom={5}>
        <HStack space={0}>
          <Box
            width={12}
            height={12}
            borderRadius="full"
            backgroundColor="#6f91be"
            zIndex={3}
            ml={-8}
            mt={0}
          >
            <Text
              alignSelf="center"
              marginTop={4}
              style={{
                fontSize: 23,
                fontWeight: '900',
                color: 'white',
              }}
            >
              {pre_rank}
            </Text>
          </Box>

          <Box ml={-10}>
            <Avatar
              bg="purple.600"
              size="2xl"
              source={{
                uri: picture,
              }}
            ></Avatar>
          </Box>
          <Box
            width={10}
            height={10}
            borderRadius="full"
            backgroundColor={kolor}
            zIndex={3}
            ml={-8}
            mt={20}
          >
            {logok === 'arrow-up' ? (
              <Ionicons name="arrow-up" size={40} color="#ffff" />
            ) : (
              <Ionicons name="arrow-down" size={40} color="#ffff" />
            )}
          </Box>
          <Box
            zIndex={-1}
            alignSelf="center"
            alignContent="center"
            width={270}
            height={89}
            style={{
              backgroundColor: '#6f91be',
              marginLeft: -50,

              borderRadius: 30,
            }}
          >
            <VStack marginY={5} space={0} marginRight={5}>
              <Text
                marginLeft={8}
                alignSelf="center"
                style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}
              >
                {nombre}
              </Text>
              <Text alignSelf="center" style={{ fontSize: 13, color: 'white' }}>
                Puntuación {puntuacion}
              </Text>
            </VStack>
          </Box>
        </HStack>
      </View>
    </>
  );
};

export default RankCard;
