import React from 'react';
import { useState } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, VStack, Container,Modal,FormControl,Input,Button,Pressable ,Select} from "native-base";

const QuizModal = ({tema}) => {
    const [showModal, setShowModal] = useState(true);
  const [Numpreguntas, setNumpreguntas] = useState("");
  return  (<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <Modal.Content maxWidth="400px">
    <Modal.CloseButton />
    <Modal.Header>Quiz de {tema}</Modal.Header>
    <Modal.Body>
    <Box maxW="300">
    <Text fontWeight="medium">Selecciona el número de preguntas</Text>

  <Select selectedValue={Numpreguntas} minWidth="200" accessibilityLabel="Número de Preguntas" placeholder="Número de Preguntas" _selectedItem={{
  bg: "teal.600",

}} mt={1} onValueChange={itemValue => setNumpreguntas(itemValue)}>
    <Select.Item label="10" value="10" />
    <Select.Item label="20" value="20" />
    <Select.Item label="30" value="30" />
    <Select.Item label="40" value="40" />
    <Select.Item label="50" value="50" />
  </Select>
</Box>

     
    </Modal.Body>
    <Modal.Footer>
    
        <Button   borderRadius={10} width={"100%"}  onPress={() => {
        setShowModal(false);
      }}>
          Iniciar Quiz
        </Button>
     
    </Modal.Footer>
  </Modal.Content>
</Modal>
  )
};

    export default QuizModal
    