import { Colors } from "@/constants/Colors";
import { useAuth } from "@/services/auth-context";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Text>{user?.username}</Text>
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

export default Profile;
