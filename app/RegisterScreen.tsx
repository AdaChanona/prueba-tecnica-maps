import React from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { register } from '../src/api/auth';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await register(data); // Llama al endpoint de registro
      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
      navigation.navigate('Login'); // Redirige a la pantalla de login
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'No se pudo registrar el usuario');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>👤</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Register an account</Text>
      <Text style={styles.subtitle}>
        Your personal data will be used to support your experience throughout
        this website, to manage access to your account.
      </Text>

      {/* First Name */}
      <Controller
        control={control}
        name="first_name"
        rules={{ required: 'First name is required' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Your first name"
              placeholderTextColor="#777"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />
      {errors.first_name && (
        <Text style={styles.errorText}>{errors.first_name.message}</Text>
      )}

      {/* Last Name */}
      <Controller
        control={control}
        name="last_name"
        rules={{ required: 'Last name is required' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Your last name"
              placeholderTextColor="#777"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />
      {errors.last_name && (
        <Text style={styles.errorText}>{errors.last_name.message}</Text>
      )}

      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Your email"
              placeholderTextColor="#777"
              keyboardType="email-address"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#777"
              secureTextEntry
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {/* Password Confirmation */}
      <Controller
        control={control}
        name="password_confirmation"
        rules={{
          required: 'Password confirmation is required',
          validate: (value) =>
            value === control._formValues.password ||
            'Passwords do not match',
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password confirmation"
              placeholderTextColor="#777"
              secureTextEntry
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />
      {errors.password_confirmation && (
        <Text style={styles.errorText}>
          {errors.password_confirmation.message}
        </Text>
      )}

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 50,
    color: '#1E90FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RegisterScreen;
