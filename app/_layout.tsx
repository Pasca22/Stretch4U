import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "@/services/auth-context";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
