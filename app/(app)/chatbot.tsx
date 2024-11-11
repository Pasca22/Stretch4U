import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatBot: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ChatBot</Text>
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

export default ChatBot;
