// services/auth-context.tsx
import { scheduleDeleteOldMessages } from "@/web-api/messages-endpoints";
import { getUserData, loginAPI, signupAPI } from "@/web-api/users-endpoints";
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
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setToken(token);
      if (token) {
        setIsAuthenticated(true);
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const userData = await getUserData(parseInt(userId), token);
          setUser(userData);
        }
      }
    };

    checkToken();
  }, []);

  const setDataInStorage = async (data: any) => {
    const token = data.token.token;
    const user: User = {
      id: data.id,
      username: data.username,
    };
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", user.id.toString());
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const response = await loginAPI(username, password);
    if (response.status !== 200) {
      return false;
    }
    setDataInStorage(response.data);

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
    setDataInStorage(response.data);

    return true;
  };

  const logout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, token, login, signup, logout }}
    >
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
