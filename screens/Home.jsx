import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Card from "../components/cards/Card";
import sanityClient, { urlFor } from "../sanity";

const Home = () => {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [flatData, setFlatData] = useState([]);
  const [allFlatData, setAllFlatData] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openSearchRes, setOpenSearchRes] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [restaruants, setRestaurants] = useState([]);

  const fetchSearchData = () => {
    sanityClient
      .fetch(
        `
      *[_type == "dish"]  {
        ...,

 ingridients[] ->{ 
 ...,
 },
category -> {...}
}`
      )
      .then((data) =>
        setSearchData(
          data.filter((product) => product.name.includes(searchText))
        )
      );
  };

  useEffect(() => {
    fetchSearchData();
  }, [searchText]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "category" ] {
        ...,
 
  }
  `
      )
      .then((data) => setCategories(data));
  }, []);

  const fetchSelectedCategory = (category) => {
    sanityClient
      .fetch(
        `
      *[_type == "dish"]  {
        ...,

 ingridients[] ->{ 
 ...,
 },
 
category -> {...}
}`
      )
      .then((data) =>
        setFlatData(
          data.filter((product) => product.category._id.includes(category._id))
        )
      )
      .then(setAllFlatData([]))
      .then(setIsSelected(true));
  };

  const fetchAllData = () => {
    sanityClient
      .fetch(
        `*[_type == "dish"]  {
        ...,

 ingridients[] ->{ 
 ...,
 },
category -> {...}
}`
      )
      .then((data) => setAllFlatData(data))
      .then(fetchSelectedCategory([]))
      .then(setIsSelected(false));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "restaurant"]  {
  ...,
  dishes[]-> {...}
}
      `
      )
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor="#FA4A0C"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      className="flex-1"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-[130px]">
        <View
          style={{ flexDirection: "row" }}
          className="justify-between mt-[60px]"
        >
          <TouchableOpacity>
            <Image
              className="w-[50px] h-[50px] rounded-xl ml-3"
              source={require("../src/assets/svg/menu.jpg")}
            />
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row" }}
            className="flex justify-center  items-center font-semibold space-x-1"
          >
            {showDropDown ? (
              <TouchableOpacity
                style={{}}
                onPress={() => setShowDropDown(false)}
              >
                <View
                  className="flex justify-center  items-center font-semibold"
                  style={{ flexDirection: "row" }}
                >
                  <Ionicons name="location-outline" size={24} color="#F54748" />
                  <Text className="text-[#1D2741] text-[14px] font-semibold">
                    California, US
                  </Text>
                  <Entypo name="chevron-small-up" size={29} color="#F54748" />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowDropDown(true)}>
                <View
                  className="flex justify-center  items-center font-semibold"
                  style={{ flexDirection: "row" }}
                >
                  <Ionicons name="location-outline" size={24} color="#F54748" />
                  <Text className="text-[#1D2741] text-[17px] font-semibold">
                    California, US
                  </Text>
                  <Entypo name="chevron-small-down" size={29} color="#F54748" />
                </View>
              </TouchableOpacity>
            )}
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
        {showDropDown ? (
          <View
            className="bg-white px-[20px] rounded-xl py-3 z-50"
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 100,
            }}
          >
            {restaruants.map((restautant) => (
              <View key={restautant._id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Restaurants", {
                      restautant,
                    })
                  }
                >
                  <View className="bg-[#ff895f97] py-2 mt-1 rounded-lg px-[40px]">
                    <Text className="text-[17px]">{restautant.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}

        <View>
          <View
            className="items-center ml-[15px] mt-[27px]"
            style={{ flexDirection: "row" }}
          >
            <Text className="text-[25px] text-[#1D2741]">Hello</Text>
            <Image
              className="w-[35px] h-[35px] ml-2"
              source={require("../src/assets/svg/hand.png")}
            />
          </View>
          <View className="w-[250px] mt-5 ml-[15px]">
            <Text className="text-[30px] font-semibold text-[#1D2741]">
              What is your <Text className="text-[#F54748]">favourite</Text>{" "}
              dish ?
            </Text>
          </View>
          <View className=" justify-center items-center shadow-lg shadow-slate-500 mt-[20px] ">
            <Ionicons
              style={{ position: "absolute", left: 40, zIndex: 10 }}
              name="search-outline"
              size={24}
              color="black"
            />
            <TextInput
              className="bg-white pl-[66px] text-[19px] w-[346px] h-[48px] rounded-3xl"
              placeholder="Search your food"
              placeholderTextColor="gray"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onPressIn={() => setOpenSearchRes(true)}
            />
            {openSearchRes ? (
              <TouchableOpacity
                onPress={() => setOpenSearchRes(false)}
                style={{ position: "absolute", right: 40, zIndex: 20 }}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            ) : null}
          </View>
          {openSearchRes ? (
            <View className="items-center">
              <View className="space-y-2 w-[350px] bg-white p-[10px]  mt-[10px] rounded-2xl">
                {searchData.map((item, id) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Product", {
                        id,
                        item,
                      })
                    }
                  >
                    <View className="flex-row bg-[#ebedf673] py-1 rounded-lg items-center space-x-[100px]  px-8">
                      <Image
                        source={{
                          uri: urlFor(item.image.asset._ref).url(),
                        }}
                        className="w-12 h-12 rounded-full"
                      />
                      <View
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Text className="mr-[60px]">{item.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null}
          <View>
            <Text className="text-[17px] font-semibold ml-[15px] mt-[18px]">
              Categories
            </Text>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row" }}
              className="space-x-3 pl-3 mt-5"
            >
              <TouchableOpacity
                onPress={fetchAllData}
                style={{ flexDirection: "row", height: 60 }}
                className="bg-[#F54748] space-x-4 px-2 items-center justify-between rounded-full"
              >
                <View className="bg-white  rounded-full p-1">
                  <Image
                    source={require("../src/assets/images/icon-food.png")}
                    className="h-[36px] w-[36px] rounded-full"
                  />
                </View>
                <Text className="mr-4 text-white text-[16px]">All</Text>
              </TouchableOpacity>
              {categories?.map((category) => (
                <TouchableOpacity
                  key={category._id}
                  onPress={() => fetchSelectedCategory(category)}
                  style={{
                    flexDirection: "row",

                    height: 60,
                    backgroundColor:
                      category._ref === category._ref ? "#F5E4E4" : "#DE1516",
                  }}
                  className=" space-x-4 px-2 items-center justify-between rounded-full"
                >
                  <View className="bg-white  rounded-full p-1">
                    <Image
                      className="h-[36px] w-[36px] rounded-full"
                      source={{ uri: urlFor(category.image.asset._ref).url() }}
                    />
                  </View>
                  <Text className="mr-4 text-black text-[16px]">
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View>
            <View className="ml-[16px] mt-5">
              <Text className="text-[#1D2741] w-[121px] text-[24px] font-semibold">
                Found {isSelected ? flatData.length : allFlatData.length}{" "}
                Results
              </Text>
            </View>
            <View
              style={{
                paddingTop: 10,
              }}
            >
              <FlatList
                extraData={allFlatData}
                columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}
                data={isSelected ? flatData : allFlatData}
                contentContainerStyle={{ flexGrow: 0.5 }}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Card
                    imgUrl={item.image.asset._ref}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    item={item}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
