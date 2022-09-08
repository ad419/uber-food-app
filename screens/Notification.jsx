import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import { urlFor } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNotificationItems,
  clearNotifications,
  removeNotification,
} from "../features/notificationSlice";
import { useNavigation } from "@react-navigation/native";

const Notification = () => {
  const [groupNotificationsInList, setGroupNotificationsInList] = useState([]);

  const items = useSelector(selectNotificationItems);

  const dispatch = useDispatch();

  useEffect(() => {
    const groupNotifications = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupNotificationsInList(groupNotifications);
  }, [items]);

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
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
      <ScrollView>
        {items.length ? (
          <View className="items-center space-y-4 mt-[20px]">
            {items[0]?.item.map((item) => (
              <View className="flex-row bg-[#d4daf3ae] items-center space-x-7 p-5 mt-12 rounded-xl w-[330px]">
                <View>
                  <Image
                    source={{ uri: urlFor(item?.image.asset._ref).url() }}
                    className="w-[60px] h-[60px] rounded-full"
                  />
                </View>
                <View>
                  <Text className="text-[16px] font-semibold">
                    {item?.name.slice(0, 19)}...
                  </Text>
                  <Text>{item?.desc.slice(0, 21)}...</Text>
                  <Text className="pt-[8px] text-gray-500">8/16/2022</Text>
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(removeNotification({ id: item.id }))
                    }
                  >
                    <Text>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center  mt-[100px]">
            <Text className="text-3xl">You have no Notifiactions</Text>
          </View>
        )}
      </ScrollView>
      <View>
        {items.length ? (
          <TouchableOpacity onPress={() => dispatch(clearNotifications())}>
            <View className="items-center mb-[100px]">
              <Text>Clear Notifiactions</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Notification;
