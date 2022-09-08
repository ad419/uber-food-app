import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../firebase";
import { AntDesign } from "@expo/vector-icons";

const Profile = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const handleUpdateProfile = () => {
    auth.currentUser
      .updateProfile({
        displayName: newUserName,
        photoURL: newImage,
      })
      .then(alert("Swipe up to reload page and see changes"));

    setEditable(false);
    setEditableImage(false);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  const [editable, setEditable] = useState(false);
  const [editableImage, setEditableImage] = useState(false);

  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newImage, setNewImage] = useState("");

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const clostFunk = () => {
    setEditable(false), setEditableImage(false);
  };

  const profileImage = React.useMemo(() => newImage);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="bg-[#F5F5F8]"
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View className="mt-[50px] ml-[20px]">
          <Entypo name="chevron-small-left" size={45} color="black" />
        </View>
      </TouchableOpacity>
      <View className="ml-[30px]">
        <Text className="text-[34px] mt-[40px] font-semibold">My profile</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="px-[30px] mb-[10px] mt-[50px]"
      >
        <Text className="text-[18px] font-semibold">Personal Details</Text>
        {editable ? (
          <TouchableOpacity onPress={() => clostFunk()}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEditable(true)}>
            <Text className="text-[#FA4A0C]">change</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="px-7">
        <View
          style={{ flexDirection: "row" }}
          className="bg-white items-center justify-between py-[50px] rounded-2xl"
        >
          <View>
            {editable ? (
              <TouchableOpacity onPress={() => setEditableImage(true)}>
                <Image
                  className="w-[110px] ml-3 h-[110px]"
                  source={require("../src/assets/images/edit_user.png")}
                />
              </TouchableOpacity>
            ) : (
              <Image
                className="w-[110px] ml-3 h-[110px]"
                source={{
                  uri:
                    auth.currentUser?.photoURL ||
                    "https://i.postimg.cc/c1VRS8Py/OIP.jpg",
                }}
              />
            )}
          </View>
          <View className="ml-3">
            {editable ? (
              <TextInput
                value={newUserName}
                className="text-[17px] border-b-gray-600 border-b w-[153px]"
                onChangeText={(text) => setNewUserName(text)}
                placeholder={auth.currentUser?.displayName}
              />
            ) : (
              <Text className="text-[18px]  font-semibold mb-2">
                {auth.currentUser?.displayName}
              </Text>
            )}
            {editable ? (
              <TextInput
                value={newPassword}
                className="text-[17px] mt-[20px]"
                onChangeText={(text) => setNewPassword(text)}
                placeholder={auth.currentUser?.email}
              />
            ) : (
              <Text className="text-[15px] mb-3 mt-3">
                {auth.currentUser?.email}
              </Text>
            )}

            <View
              style={{
                borderBottomColor: "black",
                width: 153,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <Text className="mt-3 mb-3">5698 345 345 345</Text>
            <View
              style={{
                borderBottomColor: "black",
                width: 153,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text className="w-[182px] mt-3">
              No 15 uti street off ovie palace road effurun delta state
            </Text>
          </View>
        </View>

        <View
          style={{
            display: editableImage ? "flex" : "none",
          }}
          className="bg-white px-[26px] items-center rounded-3xl justify-between py-[18px] mt-[30px] flex-row"
        >
          <TextInput
            value={newImage ? newImage : profileImage}
            onChangeText={(text) => setNewImage(text)}
            placeholder="Image URl"
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
          <View className="bg-white px-[26px] items-center rounded-3xl justify-between py-[18px] mt-[30px] flex-row">
            <Text className="text-[18px]  font-semibold">Orders</Text>
            <Entypo name="chevron-small-right" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <View className="bg-white px-[26px] items-center rounded-3xl justify-between py-[18px] mt-[30px] flex-row">
          <Text className="text-[18px]  font-semibold">Faq</Text>
          <Entypo name="chevron-small-right" size={30} color="black" />
        </View>
        <View className="bg-white px-[26px] items-center rounded-3xl justify-between py-[18px] mt-[30px] flex-row">
          <Text className="text-[18px]  font-semibold">Help</Text>
          <Entypo name="chevron-small-right" size={30} color="black" />
        </View>
        <View className="justify-center mt-[40px] mb-[20px] items-center">
          {editable ? (
            <TouchableOpacity
              onPress={handleUpdateProfile}
              className="bg-[#FA4A0C] py-[25px] rounded-full px-[125px]"
            >
              <Text className="text-white text-[17px] font-semibold">
                Update
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSignOut}
              className="bg-[#FA4A0C] py-[25px] rounded-full px-[125px]"
            >
              <Text className="text-white text-[17px] font-semibold">
                Sign Out
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
