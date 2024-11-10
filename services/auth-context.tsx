// services/auth-context.tsx
import { loginAPI, signupAPI } from "@/web-api/users-endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkToken();
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const response = await loginAPI(username, password);
    if (response.status !== 200) {
      return false;
    }
    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
    setIsAuthenticated(true);
    return true;
  };

  const signup = async (
    username: string,
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    const response = await signupAPI(username, password, confirmPassword);
    if (response.status !== 200) {
      return false;
    }
    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
