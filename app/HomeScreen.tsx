import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { logout } from '../src/api/auth';

const HomeScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await logout(token);
        console.log('Logout response:', response);
        await AsyncStorage.removeItem('token');
        router.replace('/LoginScreen');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>¡Bienvenidos!</Text>

      <View style={styles.imageContainer}>
        <Image
          source={require('../src/assets/images/groundhog.png')} // Reemplaza esta URL con el icono que desees
          style={styles.image}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fc',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a90e2',
    marginTop: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    marginVertical: 30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#eef1f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  signIn: {
    color: '#4a90e2',
    fontWeight: '600',
  },
});

export default HomeScreen;
