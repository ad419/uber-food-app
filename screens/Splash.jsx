import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <LottieView
        autoPlay={true}
        loop={false}
        source={require("../src/assets/json/splash.json")}
        onAnimationFinish={() => navigation.replace("Landing Page")}
      />
    </View>
  );
};

export default Splash;
