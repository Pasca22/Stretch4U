import StyledButton from "@/components/StyledButton";
import { Colors } from "@/constants/Colors";
import { LOGIN, NO_ACCOUNT, SIGNUP, TITLE } from "@/constants/Text";
import { useAuth } from "@/services/auth-context";
import { Link, router } from "expo-router";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    const trimmedUsername = username.trim();
    if (trimmedUsername.includes(" ")) {
      alert("Username cannot contain spaces");
      return;
    }
    const response = await login(trimmedUsername, password);
    if (response === false) {
      alert("Invalid username or password");
      return;
    }
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{TITLE}</Text>
      <View style={styles.separator} />
      <Text style={styles.subtitle}>{LOGIN}</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder="Username"
        placeholderTextColor="#ddd"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        placeholderTextColor="#ddd"
        secureTextEntry={true}
      />
      <Text>
        {NO_ACCOUNT}
        <Link href="/signup" style={styles.signup} replace>
          {SIGNUP}
        </Link>
      </Text>
      <KeyboardAvoidingView behavior="padding">
        <StyledButton title={LOGIN} type="big" onPress={handleLogin} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 40,
    marginBottom: 5,
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#ddd",
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    backgroundColor: "#fff",
    color: "#000",
  },
  signup: {
    textDecorationLine: "underline",
  },
});

export default Login;
