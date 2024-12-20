import { Colors } from "@/constants/Colors";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet } from "react-native";

type ButtonProps = {
  onPress?: () => void;
  title: string;
  type: string;
};

const StyledButton = ({ onPress, title, type }: ButtonProps) => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  if (type === "secondary") {
    return (
      <TouchableOpacity onPress={onPress} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  if (type === "big") {
    return (
      <TouchableOpacity onPress={onPress} style={styles.bigButton}>
        <Text style={styles.bigButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 15,
  },
  primaryButtonText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    color: "#FFFFFF",
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
  },
  secondaryButtonText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    color: "#fff",
  },
  bigButton: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginVertical: 15,
  },
  bigButtonText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default StyledButton;
