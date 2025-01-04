import axios, { AxiosResponse } from "axios";

// Configuración base de Axios
const API_URL = "https://maxcloud.mx/api"; 
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Tipos para los datos
interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// Función para registrar usuarios
export const register = async (data: RegisterData): Promise<AxiosResponse<User>> => {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Error en el registro";
  }
};

// Función para iniciar sesión
export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Error en el inicio de sesión";
  }
};

// Función para obtener información del usuario autenticado
export const getUser = async (token: string): Promise<User> => {
  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Error al obtener la información del usuario";
  }
};

// Función para cerrar sesión
export const logout = async (token: string): Promise<{ message: string }> => {
  try {
    const response = await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Error al cerrar sesión";
  }
};
