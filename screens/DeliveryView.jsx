import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Lotie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const DeliveryView = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 3000);
  }, []);

  return (
    <View className="bg-[#ffb700] flex-1">
      <Lotie
        source={require("../src/assets/json/delivery.json")}
        autoPlay
        loop
        style={{
          marginTop: -80,
        }}
      />
      <View className="items-center">
        <View className="items-center p-10 rounded-lg shadow-slate-600 shadow-xl w-[320px] bg-white mt-[550px]">
          <View>
            <View>
              <Lotie
                style={{
                  top: -90,
                }}
                source={require("../src/assets/json/progress.json")}
                autoPlay
                loop
              />
            </View>
            <Text className="font-bold text-gray-500 text-[17px]">
              Estimated Arrival
            </Text>

            <Text className="text-4xl font-bold mt-[29px]">40-45 mins</Text>
            <Text>Your Order is beeing prepared!</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryView;
