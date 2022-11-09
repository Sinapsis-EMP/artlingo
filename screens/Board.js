import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Container } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';

import RankCard from '../components/RankCard';
import { queries } from '../graphql';

const Board = () => {
  const { data: { stats_scorez } = {} } = useQuery(queries.ShowRank);

  return (
    <ScrollView style={styles.container}>
      <Container
        maxWidth="full"
        style={{
          backgroundColor: 'white',
          paddingTop: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 20,
        }}
      >
        {stats_scorez?.map((stats_scorez, index) => (
          <RankCard
            key={index}
            nombre={stats_scorez.jugador}
            score={stats_scorez.puntuacion}
            pre_rank={stats_scorez.pre_rank}
          ></RankCard>
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
