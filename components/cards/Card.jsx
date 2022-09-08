import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../../sanity";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../features/basketSlice";

const Card = ({ item, id }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ item, id }));
  };

  return (
    <View
      style={{
        marginTop: 100,
        marginBottom: 30,
      }}
      className="bg-white rounded-3xl max-h-[240px] max-w-[175px]"
    >
      <View style={{}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Product", {
              id,
              item,
            })
          }
        >
          <View className="justify-center  items-center">
            <Image
              resizeMode="cover"
              style={{ position: "absolute" }}
              className="w-[120px] h-[120px] rounded-full"
              source={{ uri: urlFor(item.image.asset._ref).url() }}
            />
          </View>
          <View className="">
            <View className="justify-center items-center">
              <Text className="text-[16px] font-medium mt-[70px]">
                {item.name}
              </Text>
              {item.ingridients.slice(0, 2)?.map((ingr) => (
                <Text className="text-[14px] pt-2 w-[120px] text-center">
                  {ingr.ingridient_name}
                </Text>
              ))}
              <Text className="text-[#F54748] text-[19px] pt-6 font-bold">
                ${item.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={addItemToBasket}
          style={{
            flexDirection: "row",
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
          className="bg-[#FBD462] mt-5 py-[12px] px-[34px] items-center space-x-2"
        >
          <SimpleLineIcons name="handbag" size={24} color="black" />
          <Text>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
