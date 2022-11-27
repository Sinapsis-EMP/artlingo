import React, { useEffect } from 'react';
import { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import {
  Alert,
  Box,
  Button,
  Center,
  CloseIcon,
  Collapse,
  HStack,
  IconButton,
  Modal,
  Pressable,
  Select,
  Text,
  VStack,
} from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';

import pill from '../assets/pill.png';
import Categorias from '../components/Categorias';
import { queries } from '../graphql';

const player = 'marco@example.com';

const Inicio = ({ navigation }) => {
  const { data: { users } = {} } = useQuery(queries.ShowUser, {
    variables: {
      email: player,
    },
  });
  const [plan, setPlan] = useState();

  useEffect(() => {
    if (users) {
      setPlan(users[0].plan);
    }
  }, [users]);
  const [numPreguntas, setNumPreguntas] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const [tema, setTema] = useState<string>(null);
  const [show, setShow] = React.useState(false);

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
              <Categorias nombre="Farmacología" picture={pill}></Categorias>
            </Pressable>
            <Categorias nombre="Anatomía" picture={pill}></Categorias>
          </HStack>
          <HStack space={10} alignItems="center">
            <Categorias nombre="Farmacología" picture={pill}></Categorias>
            <Categorias nombre="Farmacología" picture={pill}></Categorias>
          </HStack>
        </VStack>
      </Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header bgColor="blue.100">{tema}</Modal.Header>
          <Modal.Body>
            <Box maxW={300}>
              {plan === 'Gratuito' ? (
                <>
                  <Box w="100%" alignItems="center">
                    <Collapse isOpen={show}>
                      <Alert maxW="400" status="info" colorScheme="info">
                        <VStack space={1} flexShrink={1} w="100%">
                          <HStack
                            flexShrink={1}
                            space={2}
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <HStack
                              flexShrink={1}
                              space={2}
                              alignItems="center"
                            >
                              <Alert.Icon />
                              <Text
                                fontSize="md"
                                fontWeight="medium"
                                _dark={{
                                  color: 'coolGray.800',
                                }}
                              >
                                Plan Gratuito!
                              </Text>
                            </HStack>
                            <IconButton
                              variant="unstyled"
                              _focus={{
                                borderWidth: 0,
                              }}
                              icon={<CloseIcon size="3" />}
                              _icon={{
                                color: 'coolGray.600',
                              }}
                              onPress={() => setShow(false)}
                            />
                          </HStack>
                          <Box
                            pl="6"
                            _dark={{
                              _text: {
                                color: 'coolGray.600',
                              },
                            }}
                          >
                            Solo puedes jugar 10 preguntas , actualiza tu plan
                            para más preguntas.
                          </Box>
                          <Button
                            onPress={() => {
                              navigation.navigate('Planes');
                            }}
                          >
                            <Text> Actualizar Plan</Text>
                          </Button>
                        </VStack>
                      </Alert>
                    </Collapse>
                  </Box>
                  <Text fontWeight="medium">
                    Selecciona el número de preguntas
                  </Text>

                  <Select
                    onOpen={() => setShow(true)}
                    minWidth="200"
                    mt={1}
                    selectedValue={`${numPreguntas}`}
                    onValueChange={(n) => setNumPreguntas(parseInt(n))}
                    accessibilityLabel="Número de Preguntas"
                    placeholder="Número de Preguntas"
                    _selectedItem={{ bg: 'teal.600' }}
                  >
                    {[10].map((num) => (
                      <Select.Item
                        key={num}
                        label={`${num}`}
                        value={`${num}`}
                      />
                    ))}
                  </Select>
                </>
              ) : (
                <>
                  <Text fontWeight="medium">
                    Selecciona el número de preguntas
                  </Text>
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
                      <Select.Item
                        key={num}
                        label={`${num}`}
                        value={`${num}`}
                      />
                    ))}
                  </Select>
                </>
              )}
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!numPreguntas}
              borderRadius={10}
              background="#7493BA"
              width="100%"
              onPress={() => {
                navigation.navigate('Quiz', {
                  limit2: numPreguntas,
                });
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
