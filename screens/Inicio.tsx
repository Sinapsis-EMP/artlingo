import React, { useEffect } from 'react';
import { useState } from 'react';

import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  Pressable,
  Select,
  Text,
  VStack,
} from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';

import pill from '../assets/pill.png';
import Categorias from '../components/Categorias';

const Inicio = ({ navigation }) => {
  const [numPreguntas, setNumPreguntas] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const [tema, setTema] = useState<string>(null);

  useEffect(() => {
    // TODO: Get the questions from the server
    setTimeout(() => {
      setTema('Farmacología');
    }, 100);
  }, [setTema]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Center>
        <VStack space={5}>
          <HStack space={10} alignItems="center">
            <Pressable
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Categorias nombre={'Farmacología'} picture={pill}></Categorias>
            </Pressable>
            <Categorias nombre={'Anatomía'} picture={pill}></Categorias>
          </HStack>
          <HStack space={10} alignItems="center">
            <Categorias nombre={'Farmacología'} picture={pill}></Categorias>
            <Categorias nombre={'Farmacología'} picture={pill}></Categorias>
          </HStack>
        </VStack>
      </Center>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Quiz de {tema}</Modal.Header>
          <Modal.Body>
            <Box maxW={300}>
              <Text fontWeight="medium">Selecciona el número de preguntas</Text>
              <Select
                minWidth="200"
                mt={1}
                selectedValue={`${numPreguntas}`}
                onValueChange={(n) => setNumPreguntas(parseInt(n))}
                accessibilityLabel="Número de Preguntas"
                placeholder="Número de Preguntas"
                _selectedItem={{ bg: 'teal.600' }}
              >
                {[10, 20, 30, 40, 50].map((num) => (
                  <Select.Item key={num} label={`${num}`} value={`${num}`} />
                ))}
              </Select>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!numPreguntas}
              borderRadius={10}
              width="100%"
              onPress={() => {
                navigation.navigate('Quiz', { limit2: numPreguntas });
                setShowModal(false);
                setNumPreguntas(null);
              }}
            >
              Iniciar Quiz
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    flex: 1,
  },
});

export default Inicio;
