import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import { Container } from 'native-base';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';

import RankCard from '../components/RankCard';
import { queries } from '../graphql';

const Board = () => {
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
        {users?.map((user, index) => (
          <RankCard
            key={index}
            nombre={user?.name}
            score={user?.scorexxx?.puntuacion}
            pre_rank={user?.scorexxx?.pre_rank}
            picture={user?.picture}
            email={user?.email}
          />
        ))}
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

export default Board;
