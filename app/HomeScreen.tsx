import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../src/api/auth';

const HomeScreen = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await getUser(token);
        setUser(response.data);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user ? user.name : 'Invitado'}!</Text>
      <Button title="Cerrar Sesión" onPress={async () => {
        await AsyncStorage.removeItem('token');
        setUser(null);
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});

export default HomeScreen;
