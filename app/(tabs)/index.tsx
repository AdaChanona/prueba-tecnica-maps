import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
         router.push('/HomeScreen');// Navega a Home si el token existe
        } else {
          router.push('/LoginScreen'); // Navega al login si no hay token
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false); // Termina el estado de carga
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    // Muestra un indicador de carga mientras se verifica la autenticación
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null; // No se renderiza nada ya que el redireccionamiento está manejado
};

export default AppNavigator;
