import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Lotie from "lottie-react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { urlFor } from "../sanity";

const RestaurantScreen = ({ navigation }) => {
  const {
    params: { restautant },
  } = useRoute();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    map: {
      width: 350,
      height: 400,
      marginTop: 20,
    },
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  console.log(restautant);

  const coordinates = [
    {
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
    },
    {
      latitude: restautant.lat,
      longitude: restautant.long,
    },
  ];

  if (!location)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Lotie
          source={require("../src/assets/json/location.json")}
          autoPlay
          loop
          style
        />
        <Text className="text-2xl font-bold text-[#E6C339] mt-[330px]">
          Tracking your location
        </Text>
      </View>
    );
  else {
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View className="flex-row items-center bg-orange-300 space-x-9 px-[30px] rounded-xl justify-between py-[10px] mt-[60px]">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Entypo
                style={{
                  marginLeft: -27,
                }}
                name="chevron-left"
                size={35}
                color="black"
              />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-center">
              {restautant.name}
            </Text>
          </View>
          <MapView
            initialRegion={{
              latitude: restautant.lat,
              longitude: restautant.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            userLocationCalloutEnabled
            mapType="mutedStandard"
            style={styles.map}
            showsUserLocation
            followsUserLocation
          >
            <Marker
              title={restautant.name}
              coordinate={{
                latitude: restautant.lat,
                longitude: restautant.long,
              }}
              image={require("../src/assets/images/location_icon2.png")}
            />
            <Marker
              title="You"
              coordinate={{
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
              }}
              image={require("../src/assets/images/location_icon2.png")}
            />
            <Marker
              title={restautant.name}
              coordinate={{
                latitude: restautant.lat,
                longitude: restautant.long,
              }}
              image={require("../src/assets/images/location_icon2.png")}
            />

            <Polyline
              coordinates={coordinates}
              strokeColor="red"
              strokeWidth={4}
            />
          </MapView>
          <View className="flex-row items-center gap-[20px]">
            <View className="flex-row items-center gap-[10px]">
              <Entypo name="location" size={24} color="black" />
              <Text>{restautant.address}</Text>
            </View>
            <View className="flex-row items-center gap-[10px]">
              <AntDesign name="staro" size={24} color="black" />
              <Text>{restautant.rating}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <ScrollView
              style={{
                flex: 1,
              }}
              className="space-x-[10px] pl-[16px] pr-[20px] mt-[20px]"
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {restautant.dishes?.map((item) => (
                <View
                  key={item.name}
                  className="bg-white rounded-full w-[80px] px-[9px] py-[27px] items-center justify-center"
                >
                  <Image
                    className="w-[59px] h-[59px] rounded-full"
                    source={{
                      uri: urlFor(item.image.asset._ref).url(),
                    }}
                  />

                  <Text className="w-[60px] mt-2 text-center">{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View className=" flex-row justify-center px-3 mt-[20px]">
            <View className="bg-[#fdfab4d0] rounded-2xl p-3">
              <Text className=" text-sm">{restautant.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default RestaurantScreen;
