import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from 'native-base';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';

import { Ambulancia, Hospital, Jeringa, Plan, Silla } from '../assets/icons';
import RankCard from '../components/RankCard';
import { queries } from '../graphql';

const Planes = () => {
  // const { data: { stats_scorez } = {} } = useQuery(queries.ShowRank);
  const { data: { users } = {} } = useQuery(queries.ShowRanking);

  return (
    <ScrollView style={styles.container}>
      <Container
        maxWidth="full"
        style={{
          backgroundColor: '#f4f4f4',
          paddingTop: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 0,
        }}
      >
        <Box
          width="full"
          style={{
            backgroundColor: '#6f91be',
          }}
        >
          <HStack space={2}>
            <Box>
              <Plan width={150} height={150} />
            </Box>
            <VStack alignSelf={'center'}>
              <Box>
                <Text
                  style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}
                >
                  Gratuito
                </Text>
              </Box>
              <Box>
                <Button>
                  <Text style={{ fontSize: 15, color: 'black' }}>
                    Contratar
                  </Text>
                </Button>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    flex: 1,
  },
});

export default Planes;
