import React from 'react';

import LottieView from 'lottie-react-native';
import { View } from 'react-native';

const Animacion = ({ anima }) => {
  // let animacion = `'${anima}'`;
  // console.log(`'${anima}'`);
  // let animacion = 'time';
  // const [fin, setFin] = useState(true);
  return (
    <View>
      {/* {cali === 'buena' && resp === false && (
        <LottieView
          style={{
            alignItems: 'center',
            height: 200,
            width: 200,
          }}
          source={require('../assets/buena.json')}
          autoPlay
          loop={false}
          duration={4000}
          onAnimationFinish={() => setResp(true)}
        />
      )} */}
      {/* {resp && (
        <LottieView
          style={{
            alignItems: 'center',
            height: 200,
            width: 200,
          }}
          source={require('../assets/info.json')}
          autoPlay
          loop
        />
      )} */}
      {/* {cali === 'info' && !resp === true && (
        <LottieView
          style={{
            alignItems: 'center',
            height: 200,
            width: 200,
          }}
          source={require('../assets/info.json')}
          progress={1}
          speed={-10}
          autoPlay
          loop={false}
        />
      )}

      {cali === 'mala' && !resp && (
        <LottieView
          style={{
            alignItems: 'center',
            height: 200,
            width: 200,
          }}
          source={require('../assets/mala.json')}
          autoPlay
          loop={false}
          duration={1000}
          onAnimationFinish={() => setResp(true)}
        />
      )} */}
      {/* {anima === 'buena' ? (
        <LottieView
          style={{
            alignItems: 'center',
            height: 230,
            width: 230,
          }}
          source={require('../assets/paloma.json')}
          autoPlay
          loop={false}
          duration={2000}
        />
      ) : (
        <LottieView
          style={{
            alignItems: 'center',
            height: 200,
            width: 200,
          }}
          source={require(`../assets/${animacion}.json`)}
          autoPlay
          loop
          duration={1000}
        />
      )} */}
      {anima === 'info' && (
        <LottieView
          style={{
            height: 100,
            width: 100,
          }}
          source={require('../assets/info.json')}
          autoPlay
          loop
          duration={1000}
        />
      )}
      {anima === 'achiv' && (
        <LottieView
          style={{
            height: 300,
            width: 300,
          }}
          source={require('../assets/achivment.json')}
          autoPlay
          loop={false}
          duration={6000}
          // onAnimationFinish={() => setFin(false)}
        />
      )}
    </View>
  );
};
export default Animacion;
