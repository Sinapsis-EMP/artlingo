import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import {queries } from '../graphql';
import { Container} from "native-base";
import RankCard from '../components/RankCard';
const Board=()=>  {
  const {    data: { users } = {}  }= useQuery(queries.ShowUsers);

    return (

  <ScrollView contentContainerStyle={styles.container}>
          <Container maxWidth="full" style={{backgroundColor:"white", paddingTop:20, borderTopLeftRadius:30 ,borderTopRightRadius:30,marginTop:20}}>

    {users?.map((user,index) => (

                 <RankCard key={index} nombre={user.name}  score={user.puntitos.puntos} division={user.puntitos.division}  ></RankCard>
                
                
      ))}
         



             </Container>
  
    </ScrollView>
    )
 
}



const styles = StyleSheet.create({
  container: {

    backgroundColor: '#F1F1F1',
    flex:1
    


  }
  
  
});

export default Board;
