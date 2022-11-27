import React, { useEffect, useRef, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { Audio } from 'expo-av';
import { Flex, HStack, Spacer } from 'native-base';
import {
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import Animacion from '../components/Animacion';
import { mutations, queries } from '../graphql';
import { ShowRanking } from '../graphql/queries';

const { width, height } = Dimensions.get('window');
export const COLORS = {
  primary: '#252c4a',
  secondary: '#1E90FF',
  accent: '#3498db',

  success: '#00C851',
  error: '#ff4444',

  black: '#171717',
  white: '#FFFFFF',
  background: '#252C4A',
};
export const SIZES = {
  base: 10,
  width: width,
  height: height,
};
const player = 'marco@example.com';

const Quiz = ({ route, navigation }) => {
  const limit = route.params?.limit2;

  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(null);
  const [rem, setRem] = useState(null);
  console.log('isplay1' + isPlaying);

  const {
    data: { preguntas = [] } = {},
    loading: queryLoading,
    error,
  } = useQuery(queries.ShowQuestions, {
    variables: {
      limit,
    },
  });
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsPlaying(true);
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);
  const renderTime = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          width: '50%',
          padding: 40,
          borderRadius: 20,
          marginBottom: -20,
        }}
      >
        <CountdownCircleTimer
          key={key}
          size={140}
          isPlaying={isPlaying}
          duration={30}
          colors={['#7493ba', '#7493ba', '#7493ba', '#7493ba']}
          colorsTime={[25, 20, 15, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 2 })}
        >
          {({ remainingTime, color }) => (
            useEffect(() => {
              setRem(remainingTime);
            }, [remainingTime]),
            (
              <>
                <Text style={{ color, fontSize: 45, fontWeight: 'bold' }}>
                  {remainingTime}
                </Text>
              </>
            )
          )}
        </CountdownCircleTimer>
      </View>
    );
  };

  const restartQuiz = () => {
    setShowScoreModal(false);
    setKey((prevKey: number) => prevKey + 1);
    setRem(30);
    setIsPlaying(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    setmyArray2([]);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const scrollViewRef = useRef(null);

  const [navigating, setNavigating] = useState(false);
  const [myArray2, setmyArray2] = useState([]);
  const [correctas, setCorrectas] = useState(Number);
  const [presicion, setPresicion] = useState(Number);
  const [velocidad, setVelocidad] = useState(Number);
  const [partidas, setPartidas] = useState(Number);
  const [jugadas, setJugadas] = useState(Number);
  const [puntuacion, setPuntuacion] = useState();
  const [sound, setSound] = useState<Audio.Sound>(null);
  const [score, setScore] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [correctaz, setCorrectaz] = useState(Number);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const [progress, setProgress] = useState(new Animated.Value(0));
  console.log('myaray' + myArray2);

  console.log('key' + key);
  console.log('rem' + rem);

  function getAvg(myArray2: any[]) {
    const total = myArray2.reduce((acc, c) => acc + c, 0);
    return total / myArray2.length;
  }

  const average = getAvg(myArray2);
  console.log('averag' + average);
  const { data: { scorez } = {} } = useQuery(queries.ShowScorez, {
    variables: {
      jugador: player,
    },
  });

  useEffect(() => {
    if (scorez) {
      setJugadas(scorez[0].jugadas);
      setCorrectas(scorez[0].correctas);
      setPuntuacion(scorez[0].puntuacion);
      setPresicion(scorez[0].presicion);
      setVelocidad(scorez[0].velocidad);
      setPartidas(scorez[0].partidas);
    }
  }, [scorez]);

  const [UpdateScorez] = useMutation(mutations.UpdateScorez, {
    variables: {
      jugador: player,
      correctas: score,
      jugadas: preguntas?.length,
      presicion: Number(
        (
          ((correctas + score) * 100) /
          (jugadas + preguntas?.length) /
          100
        ).toFixed(2)
      ),
      velocidad: Number((velocidad + (30 - average)) / 2).toFixed(1),
      puntuacion:
        (((jugadas + preguntas?.length) *
          Math.pow(
            Number(
              (
                ((correctas + score) * 100) /
                (jugadas + preguntas?.length) /
                100
              ).toFixed(2)
            ),
            2.5
          )) /
          Math.pow(
            Math.round(Number(((velocidad + (30 - average)) / 2).toFixed(1))),
            2
          )) *
        100,
      partidas: +1,
    },
    refetchQueries: [{ query: ShowRanking }, 'ShowScorez'],
  });
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/correct.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  async function playSound2() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/wrong.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  async function playSound3() {
    console.log('Loading Sound3');
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/success.mp3')
    );
    setSound(sound);

    console.log('Playing Sound3');
    await sound.playAsync();
  }
  async function playSound4() {
    console.log('Loading Sound4');
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/tic.mp3')
    );
    setSound(sound);

    console.log('Playing Sound3');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
          console.log('uploadSound');
        }
      : undefined;
  }, [sound]);

  const aviso = (score: number) => {
    const por = (score * 100) / preguntas.length;

    console.log('pooor' + JSON.stringify(por));
    if (por >= 90) {
      setMensaje('Excelente');
    } else if (por >= 70 && por < 90) {
      setMensaje('Buen Trabajo');
    } else if (por >= 50 && por < 70) {
      setMensaje('Puedes Mejorar');
    } else if (por >= 30 && por < 50) {
      setMensaje('Necesita más Trabajo');
    } else if (por < 30) {
      setMensaje('Suerte la Próxima');
    }
    setCorrectaz(por);
  };

  const validateAnswer = (selectedOption: any) => {
    let correct_option = preguntas[currentQuestionIndex].correct_option;
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      myArray2.push(rem);
      setScore(score + 1);
      playSound();
    } else {
      playSound2();
    }
    setIsPlaying(false);

    setShowNextButton(true);
  };
  const handleNext = () => {
    if (currentQuestionIndex == preguntas.length - 1) {
      aviso(score);
      setShowScoreModal(true);
      playSound3();
      setIsPlaying(false);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
      setIsPlaying(true);
      setKey((prevKey: number) => prevKey + 1);
      playSound4();
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}
        >
          <Text
            style={{
              color: '#2d3b4',
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: '#7493BA', fontSize: 18, opacity: 0.6 }}>
            / {preguntas.length}
          </Text>
        </View>

        <Text
          style={{
            color: '#2d3b48',
            fontSize: 30,
          }}
        >
          {preguntas[currentQuestionIndex].question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        {preguntas[currentQuestionIndex]?.options.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? COLORS.success
                  : option == currentOptionSelected
                  ? COLORS.error
                  : '#BE8ABC' + '40',
              backgroundColor:
                option == correctOption
                  ? COLORS.success + '20'
                  : option == currentOptionSelected
                  ? COLORS.error + '20'
                  : '#BE8ABC',
              height: 60,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: 'white' }}>{option}</Text>

            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.success,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="ios-checkmark-circle"
                  style={{
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.error,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="ios-close-circle"
                  style={{
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderOptionsError = () => {
    let correct_option = preguntas[currentQuestionIndex].correct_option;

    return (
      <View>
        {preguntas[currentQuestionIndex]?.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correct_option
                  ? COLORS.success
                  : option != correct_option
                  ? COLORS.error
                  : '#BE8ABC' + '40',
              backgroundColor:
                option == correct_option
                  ? COLORS.success + '20'
                  : option == correct_option
                  ? COLORS.error + '20'
                  : '#BE8ABC' + '20',
              height: 60,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: '#7493BA' }}>{option}</Text>

            {option == correct_option ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.success,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="ios-checkmark-circle"
                  style={{
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : option != correct_option ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.error,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="ios-close-circle"
                  style={{
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton || rem === 0) {
      return (
        <View
          style={{
            marginBottom: 10,
            alignItems: 'center',
          }}
        >
          <Flex direction="row">
            <HStack>
              <TouchableOpacity
                onPress={() => {
                  restartQuiz();

                  navigation.navigate('Perfil');
                }}
                style={{
                  backgroundColor: '#7493ba',
                  padding: 20,
                  borderRadius: 20,
                  alignSelf: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                    textAlign: 'center',
                  }}
                >
                  Cerrar
                </Text>
              </TouchableOpacity>
              <Spacer></Spacer>
              <View
                style={{
                  alignSelf: 'center',
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    console.info('ALERT');
                    Alert.alert(
                      'El mecanismo de acción del omeprazol es..',
                      'Este grupo de compuestos actúa selectivamente sobre el eslabón final del proceso de secreción ácida gástrica, la ATPasa - H+/K+ o bomba de protones, por lo que también se les denomina inhibidores de la bomba de protones.',
                      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                    );
                  }}
                >
                  <Animacion anima="info"></Animacion>
                </Pressable>
              </View>
              <Spacer></Spacer>

              <TouchableOpacity
                onPress={handleNext}
                style={{
                  backgroundColor: '#BE8ABC',
                  padding: 20,
                  borderRadius: 20,
                  alignSelf: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                    textAlign: 'center',
                  }}
                >
                  Siguiente
                </Text>
              </TouchableOpacity>
            </HStack>
          </Flex>
        </View>
      );
    }
  };

  const progressAnim = progress.interpolate({
    inputRange: [0, preguntas.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: '70%',
          height: 30,
          borderRadius: 20,
          borderColor: '#c1c6b9',
          borderWidth: 2,
          backgroundColor: '#f4f4f4',
        }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: '#c8abc9',
              height: 27,
              borderRadius: 30,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };
  if (queryLoading) {
    return <Text>'Loading...'</Text>;
  }
  if (error) {
    return <Text>`Error! ${error.message}`</Text>;
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd();
      }}
      style={{
        flex: 1,

        paddingHorizontal: 16,

        position: 'relative',
      }}
    >
      <View>
        <ImageBackground
          source={require('../assets/fondo1.png')}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
          imageStyle={{ opacity: 0.2 }}
        >
          {renderTime()}

          {renderProgressBar()}
          {renderQuestion()}

          {rem === 0 ? renderOptionsError() : renderOptions()}
          {renderNextButton()}

          <Modal
            animationType="slide"
            transparent={true}
            visible={showScoreModal}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <ConfettiCannon
                count={200}
                origin={{ x: -10, y: 0 }}
                fadeOut={true}
                fallSpeed={5000}
              /> */}

              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: '90%',
                  borderRadius: 20,
                  padding: 20,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                  {mensaje}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    {score}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLORS.black,
                    }}
                  >
                    / {preguntas.length}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    Preguntas Contestadas {preguntas.length}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    Presición/Anterior {presicion}%
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    Presición {correctaz}%
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    Preguntas Correctas {score}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    Velocidad Promedio {30 - average}Segundos
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    Velocidad/Anterior {velocidad}Segundos
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    Partidas {partidas + 1}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    Puntuación Anterior {puntuacion}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:
                        score > preguntas.length / 2
                          ? COLORS.success
                          : COLORS.error,
                    }}
                  >
                    Puntuación/Actual
                    {(((jugadas + preguntas?.length) *
                      Math.pow(
                        Number(
                          (
                            ((correctas + score) * 100) /
                            (jugadas + preguntas?.length) /
                            100
                          ).toFixed(2)
                        ),
                        2.5
                      )) /
                      Math.pow(
                        Math.round(
                          Number(((velocidad + (30 - average)) / 2).toFixed(1))
                        ),
                        2
                      )) *
                      100}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={async () => {
                    setNavigating(true);
                    await UpdateScorez()
                      .then(() => {
                        restartQuiz();
                        setShowScoreModal(false);
                        navigation.navigate('Perfil');
                      })
                      .catch((err) => {
                        console.error('Ocurrió un error!', err);
                      })
                      .finally(() => {
                        setNavigating(false);
                      });
                  }}
                  style={{
                    backgroundColor: COLORS.accent,
                    padding: 20,
                    width: '100%',
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.white,
                      fontSize: 20,
                    }}
                  >
                    Salir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

export default Quiz;
