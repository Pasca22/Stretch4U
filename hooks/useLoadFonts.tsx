import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  return fontsLoaded;
};
