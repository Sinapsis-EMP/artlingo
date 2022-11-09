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
  const [showModal, setShowModal] = useState(false);
  const [loadingk, setLoadingk] = useState(false);

  const [Numpreguntas, setNumpreguntas] = useState();

  const [tema, setTema] = useState();

  console.log('Modal esta en ...' + showModal);

  async function f() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve('¡Hecho!'), 1000);
    });

    let result = await promise;

    console.log('result' + result);
  }

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
                selectedValue={Numpreguntas}
                minWidth="200"
                accessibilityLabel="Número de Preguntas"
                placeholder="Número de Preguntas"
                _selectedItem={{
                  bg: 'teal.600',
                }}
                mt={1}
                onValueChange={(itemValue) => setNumpreguntas(itemValue)}
              >
                <Select.Item label="10" value="10" />
                <Select.Item label="20" value="20" />
                <Select.Item label="30" value="30" />
                <Select.Item label="40" value="40" />
                <Select.Item label="50" value="50" />
              </Select>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button
              isLoading={loadingk}
              disabled={Numpreguntas === undefined}
              onPress={async () => {
                setLoadingk(true);
                await f()
                  .then(() => {
                    navigation.navigate('Quiz', { limit2: Numpreguntas });
                    setNumpreguntas();
                    setShowModal(false);
                  })
                  .catch((err) => {
                    console.log('Ocurrió un error!', err);
                  })
                  .finally(() => {
                    setLoadingk(false);
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
