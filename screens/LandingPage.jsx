import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const LandingPage = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-[#F32022]">
      <View className="flex mt-[56px] ml-[40px]">
        <Image source={require("../src/assets/images/logo.png")} />
        <Text className="text-white text-[60px] mt-[31px] font-extrabold">
          Food for Everyone
        </Text>
      </View>
      <View className="mt-[20px]">
        <Image
          className="scale-[1] w-[380px]"
          source={require("../src/assets/images/banner_login.png")}
        />
      </View>
      <View className="items-center ">
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="bg-white absolute bottom-9 rounded-full px-[105px] py-[25px]"
        >
          <Text className="text-[#F32022] text-[17px] font-semibold">
            Get started
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LandingPage;
