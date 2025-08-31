import React from 'react';
import { Text } from 'react-native';
import styles from '../styles/LoginScreenStyles';

const GoogleColoredText: React.FC = () => (
  <Text style={styles.googleTextRow}>
    <Text style={{ color: '#4285F4', fontFamily: 'SourGummy' }}>G</Text>
    <Text style={{ color: '#EA4335', fontFamily: 'SourGummy' }}>o</Text>
    <Text style={{ color: '#FBBC05', fontFamily: 'SourGummy' }}>o</Text>
    <Text style={{ color: '#4285F4', fontFamily: 'SourGummy' }}>g</Text>
    <Text style={{ color: '#34A853', fontFamily: 'SourGummy' }}>l</Text>
    <Text style={{ color: '#EA4335', fontFamily: 'SourGummy' }}>e</Text>
  </Text>
);

export default GoogleColoredText;