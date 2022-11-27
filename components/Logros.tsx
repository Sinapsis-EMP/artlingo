import { FC, useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from 'native-base';

import { NavigationProp } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Ambulancia, Hospital, Jeringa, Silla } from '../assets/icons';
import { COLORS } from '../screens/Quiz';
import ModalLogro from './ModalLogro';

type LogrosSpec = {
  [key: string]: {
    description: string;
    icon: (props: SvgProps) => JSX.Element;
    predicate: (stats: PlayerStats) => boolean;
  };
};

type LogrosProps = {
  playerStats: PlayerStats;
  navigation: NavigationProp<'Logros'>;
};

type PlayerStats = {
  jugadas: number;
  partidas: number;
  correctas: number;
};

const PLAYER = 'marco@example.com';

const Logros: FC<LogrosProps> = ({ playerStats, navigation }) => {
  console.log('props', playerStats);

  useFonts({ 'Gotika-Regular': require('../assets/fonts/Gotika-Regular.otf') });

  // const [logroNuevo, setLogroNuevo] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // setLogroNuevo(false);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <>
      <Container maxWidth="full" style={styles.container}>
        {playerStats &&
          Object.entries(LOGROS_SPEC).map(([name, spec]) => {
            const value = spec.predicate(playerStats);
            return (
              <>
                <Flex key={name}>
                  <HStack space={4}>
                    <Box>
                      <spec.icon width={120} height={120} />
                    </Box>
                    <VStack alignSelf="center">
                      <Box>
                        <Text style={styles.title}>{name}</Text>
                      </Box>
                      <Box>
                        <Text style={styles.subtitle}>{spec.description}</Text>
                      </Box>
                    </VStack>

                    <Box alignSelf="center">
                      <Ionicons
                        size={40}
                        name={value ? 'lock-open' : 'lock-closed'}
                        color={value ? COLORS.success : COLORS.error}
                      />
                    </Box>
                  </HStack>
                </Flex>

                <Divider />
              </>
            );
          })}
      </Container>
      {/* {logroNuevo && <ModalLogro show={true}></ModalLogro>} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6f91be',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
  },
});

const LOGROS_SPEC: LogrosSpec = {
  ambulancia: {
    description: 'Completa tu primera partida',
    icon: Ambulancia,
    predicate: (stats: PlayerStats) => stats.partidas > 1,
  },
  jeringa: {
    description: 'Responde 50 preguntas',
    icon: Jeringa,
    predicate: (stats: PlayerStats) => stats.jugadas >= 50,
  },
  hospital: {
    description: 'Completa 10 partidas',
    icon: Hospital,
    predicate: (stats: PlayerStats) => stats.partidas >= 10,
  },
  silla: {
    description: 'Responde correctamente a 60 preguntas',
    icon: Silla,
    predicate: (stats: PlayerStats) => stats.correctas >= 60,
  },
};

export default Logros;
