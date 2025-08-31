import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';

import BackgroundPattern from '../components/BackgroundPattern';
import GoogleColoredText from '../components/GoogleColoredText';
import QuizzycusText from '../components/QuizzycusText';
import styles from '../styles/LoginScreenStyles';

const LoginScreen: React.FC = () => {
  const [fontsLoaded] = useFonts({
    DynaPuff: require('../assets/fonts/DynaPuff-Regular.ttf'),
    SourGummy: require('../assets/fonts/SourGummy-Regular.ttf'),
  });

  const router = useRouter();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BackgroundPattern />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={32} color="#6B7280" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <QuizzycusText />
        </View>
        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Center Buttons */}
      <View style={styles.buttonsContainer}>
        {/* Facebook Button */}
        <TouchableOpacity style={styles.facebookButton}>
          <FontAwesome name="facebook" size={24} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.facebookText}>Sign up via Facebook</Text>
        </TouchableOpacity>
        {/* Google Button */}
        <TouchableOpacity style={styles.googleButton}>
          <FontAwesome name="google" size={24} color="#4285F4" style={styles.icon} />
          <Text style={styles.googleText}>
            Sign up via <GoogleColoredText />
          </Text>
        </TouchableOpacity>
        {/* Guest Button */}
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => router.replace('/home')}
        >
          <MaterialCommunityIcons name="incognito" size={24} color="#F9FAFB" style={styles.icon} />
          <Text style={styles.guestText}>Sign up as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;