import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";

const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={Home}
        options={{ tabBarLabel: "Home!" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
