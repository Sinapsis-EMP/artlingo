import React, { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { mutations, queries } from '../graphql';
import { ShowRank } from '../graphql/queries';

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
const Quiz = ({ route }) => {
  const navigation = useNavigation();

  const limit = parseInt(route.params?.limit2);

  const {
    data: { preguntas } = {},
    loading,
    error,
  } = useQuery(queries.ShowQuestions, {
    variables: {
      limit: limit,
    },
  });

  //console.log(typeof preguntas);
  const [loadingk, setLoadingk] = useState(false);
  const [myArray2, setmyArray2] = useState([]);
  const [correctas, setCorrectas] = useState();
  const [presicion, setPresicion] = useState();
  const [velocidad, setVelocidad] = useState();
  const [partidas, setPartidas] = useState();
  const [jugadas, setJugadas] = useState();
  const [puntuacion, setPuntuacion] = useState();
  const [sound, setSound] = useState();
  const [score, setScore] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [correctaz, setCorrectaz] = useState(Number);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const [rem, setRem] = useState(0);
  console.log(myArray2);
  console.log('rem actual..' + rem);
  console.log('corriendo' + isPlaying);
  if (loading) {
    return <Text>'Loading...'</Text>;
  }
  if (error) {
    return <Text>`Error! ${error.message}`</Text>;
  }
  function getAvg(myArray2) {
    const total = myArray2.reduce((acc, c) => acc + c, 0);
    return total / myArray2.length;
  }

  const average = getAvg(myArray2);
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
      presicion: (correctas * 100) / jugadas / 100,
      velocidad: (velocidad + (30 - average)) / 2,
      puntuacion:
        ((jugadas * Math.pow(presicion, 2.5)) / Math.pow(velocidad, 2)) * 100,
      partidas: +1,
    },
    refetchQueries: [{ query: ShowRank }, 'ShowScorez'],
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
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const aviso = (score) => {
    let por = (score * 100) / preguntas.length;
    console.log('pooor' + JSON.stringify(por));
    if (por >= 90) {
      setMensaje('Excelente');
      setCorrectaz(por);
    } else if (por >= 70 && por < 90) {
      setMensaje('Buen Trabajo');
      setCorrectaz(por);
    } else if (por >= 50 && por < 70) {
      setMensaje('Puedes Mejorar');
      setCorrectaz(por);
    } else if (por >= 30 && por < 50) {
      setMensaje('Necesita más Trabajo');
      setCorrectaz(por);
    } else if (por < 30) {
      setMensaje('Suerte la Próxima');
      setCorrectaz(por);
    }
  };

  const validateAnswer = (selectedOption) => {
    let correct_option = preguntas[currentQuestionIndex].correct_option;
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      setIsPlaying((prev) => prev);
      myArray2.push(rem);
      setScore(score + 1);
      playSound();
    } else {
      playSound2();
    }
    setIsPlaying((prev) => !prev);

    setShowNextButton(true);
  };
  const handleNext = () => {
    if (currentQuestionIndex == preguntas.length - 1) {
      aviso(score);
      setShowScoreModal(true);
      playSound3();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
      setIsPlaying((prev) => !prev);
      setKey((prevKey) => prevKey + 1);
      playSound4();
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const restartQuiz = () => {
    setShowScoreModal(false);
    setIsPlaying(false);
    setKey(0);
    setRem(0);
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
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={{
              color: '#7493BA',
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
            color: '#7493BA',
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

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              restartQuiz(), navigation.navigate('Inicio');
            }}
            style={{
              marginTop: 20,
              marginRight: 5,
              width: '50%',
              backgroundColor: COLORS.accent,
              padding: 20,
              borderRadius: 5,
            }}
          >
            <Text
              style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}
            >
              Cerrar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              alignSelf: 'flex-start',
              marginTop: 20,
              width: '49%',
              backgroundColor: '#BE8ABC',
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text
              style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}
            >
              Siguiente
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderTime = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
          padding: 20,
          borderRadius: 20,
        }}
      >
        <CountdownCircleTimer
          key={key}
          size={100}
          isPlaying={isPlaying}
          duration={30}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[25, 20, 15, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 2 })}
        >
          {({ remainingTime, color }) => (
            useEffect(() => {
              setRem(remainingTime);
            }, [remainingTime]),
            (<Text style={{ color, fontSize: 40 }}>{remainingTime}</Text>)
          )}
        </CountdownCircleTimer>
      </View>
    );
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, preguntas.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: '#00000020',
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: '#BE8ABC',
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  const renderEye = () => {
    if (showNextButton) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Pressable
            onPress={() =>
              Alert.alert(
                'El mecanismo de acción del omeprazol es..',
                'Este grupo de compuestos actúa selectivamente sobre el eslabón final del proceso de secreción ácida gástrica, la ATPasa - H+/K+ o bomba de protones, por lo que también se les denomina inhibidores de la bomba de protones.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
              )
            }
          >
            <Ionicons
              name="information-circle-outline"
              style={{
                color: 'green',
                fontSize: 40,
              }}
            />
          </Pressable>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="ios-eye-off"
            style={{
              color: 'black',
              fontSize: 40,
            }}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 16,
            backgroundColor: '#F1F1F1',
            position: 'relative',
          }}
        >
          {renderTime()}

          {renderProgressBar()}

          {renderQuestion()}

          {renderOptions()}
          {renderEye()}

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
              <ConfettiCannon
                count={200}
                origin={{ x: -10, y: 0 }}
                fadeOut={true}
                fallSpeed={5000}
              />

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
                    Velocidad Promedio {(30 - average).toFixed(1)}Segundos
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
                    Partidas {partidas}
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
                    Puntuación Anterior {Math.floor(puntuacion)}
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
                    {(
                      ((jugadas * Math.pow(presicion, 2.5)) /
                        Math.pow(velocidad, 2)) *
                      100
                    ).toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity
                  isLoading={loadingk}
                  onPress={async () => {
                    setLoadingk(true);
                    await UpdateScorez()
                      .then(() => {
                        restartQuiz();
                        setShowScoreModal(false);
                        navigation.navigate('Inicio');
                      })
                      .catch((err) => {
                        console.log('Ocurrió un error!', err);
                      })
                      .finally(() => {
                        setLoadingk(false);
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

          <Image
            source={require('../assets/DottedBG.png')}
            style={{
              width: SIZES.width,
              height: 130,
              zIndex: -1,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              opacity: 0.5,
            }}
            resizeMode={'contain'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;
