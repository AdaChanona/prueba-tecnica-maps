import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const AppNavigator = () => {
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
       router.replace('/HomeScreen');// Navega a Home si el token existe
      } else {
        router.replace('/LoginScreen'); // Navega al login si no hay token
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [router]);

  return null; // No se renderiza nada ya que el redireccionamiento está manejado
};

export default AppNavigator;
