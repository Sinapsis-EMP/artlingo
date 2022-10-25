import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';

import { Box} from "native-base";
const Perfil=()=>  {

    return (

  <ScrollView contentContainerStyle={styles.container}>
   
   <Box p="2" bg="primary.500" _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      color: 'warmGray.50',
      letterSpacing: 'lg'
    }} shadow={2}>
        Perfil
      </Box>
     
  
    </ScrollView>
    )
 
}



const styles = StyleSheet.create({
  container: {

    backgroundColor: '#F1F1F1',
    flex:1
    


  }
  
  
});

export default Perfil;
