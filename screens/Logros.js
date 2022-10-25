import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';
import Categorias from '../components/Categorias';
import { Box,Center,HStack,VStack} from "native-base";
import pill from '../assets/pill.png';

const Logros=()=>  {
  
    return (

  <ScrollView contentContainerStyle={styles.container}>
    <Center>
      <VStack space ={5}>
    <HStack space={10} alignItems="center">
     
<Categorias   nombre= {"Farmacología"} picture={pill}></Categorias>
<Categorias   nombre= {"Farmacología"} picture={pill}></Categorias>

    </HStack>
    <HStack space={10} alignItems="center">
<Categorias nombre= {"Farmacología"} picture={pill}></Categorias>
<Categorias nombre= {"Farmacología"} picture={pill}></Categorias>

    </HStack>
    </VStack>
    </Center>
    </ScrollView>
    )
 
}



const styles = StyleSheet.create({
  container: {

    backgroundColor: '#F1F1F1',
    flex:1
    


  }
  
  
});

export default Logros;
