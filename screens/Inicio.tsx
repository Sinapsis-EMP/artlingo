import React from 'react';
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
  const [numPreguntas, setNumPreguntas] = useState('');
  const [tema, setTema] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Center>
        <VStack space={5}>
          <HStack space={10} alignItems="center">
            <Pressable
              onPress={() => {
                setShowModal(true), setTema('Farmacología');
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
            <Box maxW="300">
              <Text fontWeight="medium">Selecciona el número de preguntas</Text>

              <Select
                minWidth="200"
                mt={1}
                selectedValue={numPreguntas}
                accessibilityLabel="Número de Preguntas"
                placeholder="Número de Preguntas"
                _selectedItem={{ bg: 'teal.600' }}
                onValueChange={setNumPreguntas}
              >
                {['10', '20', '30', '40', '50'].map((num) => (
                  <Select.Item key={num} label={num} value={num} />
                ))}
              </Select>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button
              isLoading={loading}
              disabled={!numPreguntas}
              onPress={async () => {
                setLoading(true);
                await f()
                  .then(() => {
                    navigation.navigate('Quiz', { limit2: numPreguntas });
                    setNumPreguntas(null);
                    setShowModal(false);
                  })
                  .catch((err) => {
                    console.log('Ocurrió un error!', err);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
              borderRadius={10}
              width={'100%'}
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
