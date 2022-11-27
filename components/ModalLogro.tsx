import React, { useState } from 'react';

import LottieView from 'lottie-react-native';
import { Modal, Text } from 'native-base';

const ModalLogro = ({ show }) => {
  const [showModal, setShowModal] = useState(show);
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content borderRadius={30} backgroundColor="white" maxWidth="400px">
        {/* <Modal.Header>
            <Text> Nuevo Logro Desbloqueado</Text>
          </Modal.Header> */}

        <LottieView
          style={{
            height: 300,
            width: 300,
          }}
          source={require('../assets/achivment.json')}
          autoPlay
          loop={false}
          duration={6000}
          onAnimationFinish={() => setShowModal(false)}
        />

        <Modal.Footer>
          <Text
            justifyContent="center"
            style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}
          >
            Nuevo Logro Desbloqueado
          </Text>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
export default ModalLogro;
