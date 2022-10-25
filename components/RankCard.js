import React, { useState ,useEffect} from "react";
import { Ionicons } from '@expo/vector-icons';

import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider,Avatar,VStack } from "native-base";

const RankCard = ({nombre,score,division}) => {
  const[medalla,SetMedalla]=useState("");
   useEffect(() => {

   if (division === "bronce") {
     SetMedalla("#EE8F47")
    
    }if (division === "plata") {
      SetMedalla("#C4C7C8")
    
    } if (division === "oro"){
      SetMedalla("#FACB48")
    }
   }, [division]);

  return(
<>
<Box width={380} style={{ backgroundColor:"#448AFF",marginLeft:10, paddingLeft:10, borderRadius:10 ,marginBottom:15,marginTop:10}} >

<HStack space={2} >
<Text alignSelf="center" style={{fontSize:20 , fontWeight:"bold", color:"white" ,paddingLeft:12}}>1</Text>
<Image margin={3} source={{
uri: "https://wallpaperaccess.com/full/317501.jpg"
}} alt="Alternate Text" size="sm" style={{borderRadius:10}} />
<VStack marginRight={5}  alignSelf="center">
<Text  style={{fontSize:18 ,fontWeight:"bold" ,color:"white"}}>{nombre}</Text>
<Text style={{fontSize:13,color:"white" }}>Puntuación {score}</Text>
</VStack>
<Center>
<Ionicons name="ios-medal" size={40} color={medalla}/>
</Center>
</HStack>
  </Box>
                   




         </>
       

  )
};

    export default RankCard
    