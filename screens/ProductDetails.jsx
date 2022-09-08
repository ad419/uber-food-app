import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import prod_img from "../src/assets/images/image.png";
import { ImageBackground } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { useDispatch, useSelector } from "react-redux";

import {
  selectBasketItems,
  addToBasket,
  selectBasketItemsWsingId,
  removeFromBasket,
} from "../features/basketSlice";

import {
  addToWishList,
  removeWishList,
  selectWishListItemsWsingId,
  selectWishListItems,
} from "../features/wishListSlice";
import { useEffect } from "react";

const ProductDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: { id, item },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      hederShown: false,
    });
  }, []);

  const addItemToWishList = () => {
    dispatch(addToWishList({ item, id }));
    setAddedToWList(true);
  };

  const removeItemFromWishList = () => {
    dispatch(removeWishList({ id }));
    setAddedToWList(false);
  };

  const addItemToBasket = () => {
    dispatch(addToBasket({ item, id }));
  };

  const removeItemFromBasket = () => {
    if (!cart_items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  const cart_items = useSelector((state) =>
    selectBasketItemsWsingId(state, id)
  );
  const wishList_items = useSelector((state) =>
    selectWishListItemsWsingId(state, id)
  );

  const w_list_items = useSelector(selectWishListItems);
  const basket_items = useSelector(selectBasketItems);
  const basketTotal = cart_items.length * item.price;

  const [addedToWList, setAddedToWList] = useState(false);

  useEffect(() => {
    w_list_items.map((w_item) => {
      if (w_item.id === item._id) setAddedToWList(true);
    });
  }, []);

  return (
    <ScrollView className="bg-white">
      <ImageBackground
        style={{
          flex: 1,
          height: 300,
        }}
        resizeMode="cover"
        source={{ uri: urlFor(item.image.asset._ref).url() }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View className="mt-[50px] bg-[#FBD462] w-[50px] rounded-xl ml-[30px]">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Entypo name="chevron-small-left" size={45} color="black" />
            </TouchableOpacity>
          </View>
          {addedToWList ? (
            <View className="mt-[50px]  w-[50px] rounded-xl mr-[30px]">
              <TouchableOpacity onPress={removeItemFromWishList}>
                <AntDesign name="heart" size={35} color="red" />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="mt-[50px]  w-[50px] rounded-xl mr-[30px]">
              <TouchableOpacity onPress={addItemToWishList}>
                <AntDesign name="hearto" size={35} color="red" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
      <View
        style={{
          alignItems: "center",
          flex: 1,
          zIndex: 20,
          marginTop: -20,
          paddingBottom: 1120,
        }}
      >
        <View
          className="bg-[#F5F5F5] w-full"
          style={{
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 2000,

            position: "absolute",
            zIndex: 10,
          }}
        >
          <View className="items-center mt-[50px]">
            <Text className="text-[#1D2741] w-[268px] text-center font-semibold text-[28px]">
              {item.name}
            </Text>
          </View>
          <View
            className="px-[50px] mt-[25px]"
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              className="space-x-2"
            >
              <Feather name="clock" size={24} color="#4C7E2A" />
              <Text>{item.minutage} min</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              className="space-x-2"
            >
              <AntDesign name="staro" size={24} color="#EBCA6A" />
              <Text>{item.rating}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              className="space-x-2"
            >
              <SimpleLineIcons name="fire" size={24} color="#EB7C6A" />
              <Text>{item.calories} kcal</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "center" }}
            className="mt-[40px] space-x-[-50px]"
          >
            <View className="bg-white py-[14px] justify-center px-[34px] rounded-full">
              <Text className="mr-7 font-semibold">${basketTotal}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
              className="items-center space-x-4  bg-[#FBD462] px-[28px] py-[14px] rounded-full"
            >
              <TouchableOpacity onPress={removeItemFromBasket}>
                <View>
                  <Text className="font-extrabold text-[30px]">-</Text>
                </View>
              </TouchableOpacity>

              <View className="bg-white rounded-full p-[10px] px-[15px]">
                <Text className="font-extrabold">{cart_items.length}</Text>
              </View>

              <TouchableOpacity onPress={addItemToBasket}>
                <View>
                  <Text className="font-extrabold text-[19px]">+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            className="mt-[40px] px-[40px]"
          >
            <View>
              <Text className="text-[#BDBFC6] text-[16px]">Size</Text>
              <Text className="text-black font-semibold mt-1">{item.size}</Text>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: "#E7E4ED",
              }}
            />
            <View>
              <Text className="text-[16px] text-[#BDBFC6]">Weight</Text>
              <Text className="text-black font-semibold mt-1">
                {item.weight}gr
              </Text>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: "#E7E4ED",
              }}
            />
            <View>
              <Text className="text-[16px] text-[#BDBFC6]">Price</Text>
              <Text className="text-black font-semibold mt-1">
                ${item.price}
              </Text>
            </View>
          </View>
          <View>
            <View className="pl-[40px] mt-[20px]">
              <Text className="text-[19px] font-semibold">Ingradiants</Text>
            </View>
            <ScrollView
              className="space-x-[15px] pl-[20px] pr-[20px] mt-[20px]"
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {item.ingridients?.map((item) => (
                <View className="bg-white rounded-full w-[80px] px-[9px] py-[27px] items-center justify-center">
                  <Image
                    className="w-[59px] h-[59px] rounded-full"
                    source={{
                      uri: urlFor(item.ingridient_image.asset._ref).url(),
                    }}
                  />

                  <Text className="w-[60px] mt-2 text-center">
                    {item.ingridient_name}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View>
              <View>
                <Text className="font-semibold ml-[40px] mt-[30px] text-[19px]">
                  Details
                </Text>
              </View>
              <View className="items-center">
                <Text className="w-[310px] text-[#B5B8BF] text-[16px] mt-[40px]">
                  {item.description}
                </Text>
              </View>
            </View>
            <View className="items-center mt-[30px] mv-[30px]">
              <TouchableOpacity
                onPress={() => navigation.navigate("ModalCart")}
                className="bg-[#F54748] py-[16px] rounded-full px-[111px]"
              >
                <View
                  className="space-x-3"
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text className="text-white font-semibold text-[19px]">
                    Cart
                  </Text>
                  <View className="bg-white px-[5px] rounded-full">
                    <Text className="">{basket_items.length}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
