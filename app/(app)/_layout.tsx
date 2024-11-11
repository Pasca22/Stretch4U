import { Redirect } from "expo-router";
import { useAuth } from "@/services/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from ".";
import Profile from "./profile";
import ChatBot from "./chatbot";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

const Tab = createBottomTabNavigator();

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tab.Navigator
      initialRouteName="index"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:
            | "home"
            | "home-outline"
            | "chatbubble"
            | "chatbubble-outline"
            | "person"
            | "person-outline" = "home";

          if (route.name === "index") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "chatbot") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primaryGreen,
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          backgroundColor: "white",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="index"
        component={Home}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="chatbot"
        component={ChatBot}
        options={{
          tabBarLabel: "ChatBot",
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default AppLayout;
