import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Avatar,
  VStack,
  ScrollView,
} from 'native-base';

const RankCard = ({ nombre, score, pre_rank }) => {
  const [foto, SetFoto] = useState();
  useEffect(() => {
    if (nombre === 'mariana@example.com') {
      SetFoto(
        'https://cdn2.salud180.com/sites/default/files/styles/medium/public/field/image/2020/03/estas_son_las_caracteristicas_que_vuelven_a_una_mujer_irresistible_segun_ellos.jpg'
      );
    }
    if (nombre === 'arturo@example.com') {
      SetFoto('https://definicion.de/wp-content/uploads/2008/05/hombre-1.jpg');
    }
    if (nombre === 'david@example.com') {
      SetFoto(
        'https://elcomercio.pe/resizer/xLTqY6Rs9gieCw1QIrdm2k9r0hE=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/VQK6LJEPGFA7TKMRFCSWTNCHH4.jpg'
      );
    }
    if (nombre === 'pancho@example.com') {
      SetFoto(
        'https://sobrehistoria.com//wp-content/uploads/2021/08/dia-del-hombre-2021-cuando-es-se-celebra-istock.jpg'
      );
    }
    if (nombre === 'marco@example.com') {
      SetFoto(
        'https://ath2.unileverservices.com/wp-content/uploads/sites/5/2018/02/acondicionador-de-cabello-para-hombre-e1517521713969.jpg'
      );
    }
    if (nombre === 'jorge@example.com') {
      SetFoto(
        'https://elcomercio.pe/resizer/xLTqY6Rs9gieCw1QIrdm2k9r0hE=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/VQK6LJEPGFA7TKMRFCSWTNCHH4.jpg'
      );
    }
  }, [nombre]);

  // var foto = "https://ath2.unileverservices.com/wp-content/uploads/sites/5/2018/02/acondicionador-de-cabello-para-hombre-e1517521713969.jpg"
  var puntuacion = Math.round(score);
  return (
    <Box
      width={380}
      style={{
        backgroundColor: '#448AFF',
        marginLeft: 10,
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 10,
      }}
    >
      <HStack space={2}>
        <Text
          alignSelf="center"
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            paddingLeft: 12,
          }}
        >
          {pre_rank}
        </Text>
        <Image
          margin={3}
          source={{
            uri: foto,
          }}
          alt="Alternate Text"
          size="sm"
          style={{ borderRadius: 10 }}
        />
        <VStack marginRight={5} alignSelf="center">
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
            {nombre}
          </Text>
          <Text style={{ fontSize: 13, color: 'white' }}>
            Puntuación {puntuacion}
          </Text>
        </VStack>
        {/* <Center>
<Ionicons name="ios-medal" size={40} color={medalla}/>
</Center> */}
      </HStack>
    </Box>
  );
};

export default RankCard;
