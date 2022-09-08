import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home";
import WishList from "../../screens/WishList";
import HomeStackScreen from "../../screens/HomeStackScreen";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home2" component={HomeStackScreen} />
      <Tab.Screen name="WishList" component={WishList} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
