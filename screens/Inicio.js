import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';
import Categorias from '../components/Categorias';
import { Box,Center,HStack,VStack,Pressable} from "native-base";
import pill from '../assets/pill.png';
import QuizModal from '../components/QuizModal';
import { useState } from 'react';

const Inicio=()=>  {
  const [showQModal, setShowQModal] = useState(false);
  const [tema, setTema] = useState("");

   const toggleChecked = () => setShowQModal((value) => !value);
  
    return (

  <ScrollView contentContainerStyle={styles.container}>
    <Center>
      <VStack space ={5}>
    <HStack space={10} alignItems="center">
    <Pressable onPress={() => { toggleChecked(), setTema("Farmacología")}  }>

<Categorias   nombre= {"Farmacología"} picture={pill}></Categorias>
</Pressable>
<Pressable onPress={() => { toggleChecked(), setTema("Anatomía")}  }>

<Categorias   nombre= {"Anatomía"} picture={pill}></Categorias>
</Pressable>
    </HStack>
    <HStack space={10} alignItems="center">
<Categorias nombre= {"Farmacología"} picture={pill}></Categorias>
<Categorias nombre= {"Farmacología"} picture={pill}></Categorias>

    </HStack>
    </VStack>
    </Center>
    {showQModal &&(   <QuizModal tema={tema}  />
   
)}
    </ScrollView>
    )
 
}



const styles = StyleSheet.create({
  container: {

    backgroundColor: '#F1F1F1',
    flex:1
    


  }
  
  
});

export default Inicio;
