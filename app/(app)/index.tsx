import StyledButton from "@/components/StyledButton";
import { Colors } from "@/constants/Colors";
import { LOGOUT } from "@/constants/Text";
import { useAuth } from "@/services/auth-context";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <StyledButton title={LOGOUT} type="secondary" onPress={logout} />
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
});

export default Home;
