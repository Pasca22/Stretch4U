import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "@/services/auth-context";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
