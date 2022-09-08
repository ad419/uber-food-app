import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketItems,
  removeFromBasket,
  selectBasketTotal,
  clearCart,
} from "../features/basketSlice";
import {
  selectNotificationItems,
  sendNotification,
} from "../features/notificationSlice";
import { useState } from "react";
import { urlFor } from "../sanity";
import { Feather } from "@expo/vector-icons";
import sanityClient from "../sanity";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalCart = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupItemsInBucket, setGroupItemsInBucket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const [item, setItem] = useState([]);
  const [combinedData, setCombinedData] = useState(items);

  useEffect(() => {
    const groupItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupItemsInBucket(groupItems);
  }, [items]);

  const clearAndNavigateSend = () => {
    navigation.navigate("Delivery");
    dispatch(clearCart());
    sendNotificationItem();
  };

  const fetch_data_item = () => {
    sanityClient
      .fetch(
        `
      *[_type == "message"]  {
        ...,
}
      `
      )
      .then((data) => setItem(data));
  };

  useEffect(() => {
    fetch_data_item();
  }, []);

  const sendNotificationItem = () => {
    dispatch(sendNotification({ item }));
  };

  const copyData = [...items];

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("item:key", JSON.stringify([combinedData]));
    } catch (e) {
      console.log(e);
    }
  };
  const handleCombine = () => {
    setCombinedData([...(combinedData + copyData)]);
  };

  useEffect(() => {
    storeData();
    handleCombine();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F8]">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View className="absolute top-[67px] left-7">
          <Feather name="chevron-left" size={35} color="#FA4A0C" />
        </View>
      </TouchableOpacity>
      <View className="items-center">
        <Text className="text-[30px] mt-[61px] font-semibold">Cart</Text>
      </View>
      <ScrollView className="bg-[#F5F5F8] divide-y divide-gray-300">
        <View className="px-[30px] space-y-3 mb-[20px] mt-[70px]">
          {Object.entries(groupItemsInBucket).map(([key, items]) => (
            <View
              key={key}
              className="bg-white justify-between rounded-2xl py-[16px] flex-row items-center"
            >
              <View className="items-center pl-[20px]">
                <Image
                  className="w-[100px] h-[100px] rounded-full"
                  source={{ uri: urlFor(items[0].item.image.asset._ref).url() }}
                />
              </View>
              <View>
                <Text>{items[0].item.name}</Text>
                <Text>$ {items[0].item?.price}</Text>
                <Text>x {items.length}</Text>
              </View>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <View className="pr-[30px]">
                  <Feather name="trash-2" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="px-8 space-y-1 py-[20px] text-black bg-white">
        <View
          className="flex-row "
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text className="text-gray-400 ">Subtotal</Text>
          <Text className="text-gray-400 ">$ {basketTotal}</Text>
        </View>
        <View
          className="flex-row "
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text className="text-gray-400 ">Delivery</Text>
          <Text className="text-gray-400 ">$5</Text>
        </View>
        <View
          className="flex-row "
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text className="text-black font-semibold text-[17px] ">Total</Text>
          <Text className="text-black font-semibold  text-[17px]">
            $ {basketTotal + 5}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => clearAndNavigateSend()}
            className="bg-[#F47B0A] px-[110px] mt-[10px] py-[25px] rounded-2xl"
          >
            <View>
              <Text className="w-[100px] text-white font-semibold">
                Place Order
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ModalCart;
