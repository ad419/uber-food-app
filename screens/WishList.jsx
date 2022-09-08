import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectWishListItems, removeWishList } from "../features/wishListSlice";
import { urlFor } from "../sanity";

const WishList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishListItems = useSelector(selectWishListItems);
  const [groupedWishListItems, setGroupedWishListItems] = useState([]);

  useEffect(() => {
    const groupWishLItems = wishListItems.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedWishListItems(groupWishLItems);
  }, [wishListItems]);

  return (
    <View className="flex-1 mt-[40px]">
      <View
        style={{ flexDirection: "row" }}
        className="justify-between mt-[20px]"
      >
        <TouchableOpacity>
          <Image
            className="w-[50px] h-[50px] rounded-xl ml-3"
            source={require("../src/assets/svg/menu.jpg")}
          />
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row" }}
          className="flex justify-center items-center font-semibold space-x-1"
        >
          <Ionicons name="location-outline" size={24} color="#F54748" />
          <Text className="text-[#1D2741] text-[14px] font-semibold">
            California, US
          </Text>
          <Entypo name="chevron-small-down" size={29} color="#F54748" />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View
            className="items-center bg-white py-[12px] px-[16px] rounded-xl mr-3"
            style={{ flexDirection: "row" }}
          >
            <FontAwesome name="user" size={24} color="#F54748" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center">
        <View className="bg-[#F5B86F] opacity-[0.7] px-[110px] py-[30px]  rounded-2xl mt-[60px]">
          <Text className="uppercase opacity-[1] text-[#e57e00] font-bold">
            Your WishList
          </Text>
          <View
            className="bg-white px-2 py-1 rounded-full"
            style={{
              position: "absolute",
              right: 30,
              top: 30,
            }}
          >
            <Text className="uppercase opacity-[1] text-[#e57e00] font-bold">
              {Object.entries(groupedWishListItems).length}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView className="mb-[20px] divide-y divide-gray-300">
        <View className="mt-[50px] mb-[60px]">
          {Object.entries(groupedWishListItems).map(([key, items]) => (
            <View
              key={key}
              className="flex-row justify-between py-[8px] px-[25px] items-center"
            >
              <View>
                <Image
                  className="w-[120px] h-[120px] rounded-2xl"
                  source={{ uri: urlFor(items[0].item.image.asset._ref).url() }}
                />
              </View>
              <View className="space-y-[20px] flex-1 ml-[30px] pr-[30px]">
                <Text className="text-[16px] font-semibold">
                  {items[0].item.name}
                </Text>
                <Text className="text-[13px] text-gray-400 font-semibold">
                  $ {items[0].item?.price}
                </Text>
                <View>
                  <View className="bg-[#F5B86F] py-[8px]  rounded-full items-center">
                    <Text>{items[0].item?.category.name}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => dispatch(removeWishList({ id: key }))}
              >
                <View>
                  <Ionicons name="close" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default WishList;
