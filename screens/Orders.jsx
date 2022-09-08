import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { auth } from "../firebase";
import { ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { urlFor } from "../sanity";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Orders = () => {
  const [cachedItems, setCachedItems] = useState([]);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("item:key");
      const JSONData = JSON.parse(data);
      setCachedItems(JSONData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigation = useNavigation();
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const clearStorageAndRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    AsyncStorage.clear();
  };

  return (
    <View className="mt-[49px] flex-1">
      <View className="items-center">
        <Text className="text-2xl font-semibold">
          Hello {auth?.currentUser?.displayName}
        </Text>
      </View>
      <View style={{ position: "absolute", top: -5 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View>
            <Entypo name="chevron-small-left" size={40} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="items-center mt-[60px]">
        <View className="bg-[#F5B86F] opacity-[0.7] px-[90px] py-[25px] rounded-2xl">
          <Text className="text-[#FA4A0C] text-[16px] font-bold">
            Your Orders History
          </Text>
          <View className="absolute bg-white rounded-full px-1 right-5 top-[26px]">
            <Text>{cachedItems?.length ? cachedItems[0]?.length : 0}</Text>
          </View>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="black"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        className="flex-1"
      >
        <View className=" mt-[50px] mb-[30px] space-y-2 items-center">
          {cachedItems?.length
            ? cachedItems[0].map((item) => (
                <View
                  key={item.id}
                  className="flex-row py-3 w-[300px] justify-between items-center bg-white rounded-3xl"
                >
                  <View>
                    <Image
                      className="w-[80px] rounded-xl ml-3 h-[80px]"
                      source={{
                        uri: urlFor(item?.item?.image?.asset?._ref).url(),
                      }}
                    />
                  </View>
                  <View className="mr-[120px]">
                    <Text>{item?.item?.name}</Text>
                    <Text>$ {item?.item?.price}</Text>
                    <Text>{item?.item?.category?.name}</Text>
                  </View>
                </View>
              ))
            : cachedItems?.map((item) => (
                <View
                  key={item.id}
                  className="flex-row py-3 w-[300px] justify-between items-center bg-white rounded-3xl"
                >
                  <View>
                    <Image
                      className="w-[80px] rounded-xl ml-3 h-[80px]"
                      source={{
                        uri: urlFor(item?.item?.image?.asset?._ref).url(),
                      }}
                    />
                  </View>
                  <View className="mr-[120px]">
                    <Text>{item?.item?.name}</Text>
                    <Text>$ {item?.item?.price}</Text>
                    <Text>{item?.item?.category?.name}</Text>
                  </View>
                </View>
              ))}
        </View>
      </ScrollView>
      <View className="items-center mb-[30px]">
        <TouchableOpacity
          onPress={() => clearStorageAndRefresh()}
          className="bg-[#F5B86F] px-[75px] py-[20px] rounded-2xl"
        >
          <View>
            <Text>Clear Order History</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Orders;
