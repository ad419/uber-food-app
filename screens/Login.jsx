import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TouchableOpacity } from "react-native";
import { auth } from "../firebase";

const Login = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const LoginTabS = createMaterialTopTabNavigator();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="bg-[#FFFFFF] ">
        <View
          style={{
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
          }}
          className="items-center"
        >
          <Image
            className="w-[150px] h-[162px] mt-[128px]"
            source={require("../src/assets/images/logo1.png")}
          />
        </View>
        <View
          style={{
            height: 550,
            backgroundColor: "#F2F2F2",
          }}
        >
          <LoginTabS.Navigator
            screenOptions={{
              tabBarIndicatorStyle: {
                backgroundColor: "#FA4A0C",

                display: "flex",
                alignContent: "center",
              },
              tabBarLabelStyle: {
                fontSize: 17,
                textTransform: "none",
              },
            }}
          >
            <LoginTabS.Screen
              options={{
                title: "Login",
              }}
              name="Login Tab"
              component={LoginTab}
            />
            <LoginTabS.Screen name="Register" component={RegisterTab} />
          </LoginTabS.Navigator>
        </View>
      </View>
    </ScrollView>
  );
};

function LoginTab() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)

      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: 50, alignItems: "center" }}
      enabled
      behavior={Platform.OS === "ios" ? "height" : "padding"}
    >
      <View
        style={{
          width: 314,
        }}
      >
        <Text className="text-[#A9A9A9]">Email address</Text>
        <TextInput
          style={{
            fontSize: 18,
            paddingBottom: 9,
            paddingTop: 9,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View
        style={{
          width: 314,
          marginTop: 60,
        }}
      >
        <Text className="text-[#A9A9A9]">Password</Text>
        <TextInput
          style={{
            fontSize: 18,
            paddingBottom: 9,
            paddingTop: 9,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-[#FA4A0C] py-[25px] rounded-full  px-[134px]"
        >
          <Text className="text-white text-[17px] font-semibold ">Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function RegisterTab() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [photo, setPhoto] = useState("");
  const navigation = useNavigation();

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user
          .updateProfile({
            displayName: userName,
            photoURL: photo,
          })
          .catch((error) => console.log(error));
      })

      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
      <View
        style={{
          width: 314,
        }}
      >
        <Text className="text-[#A9A9A9]">Email address</Text>
        <TextInput
          style={{
            fontSize: 18,
            paddingBottom: 6,
            paddingTop: 6,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View
        style={{
          width: 314,
          marginTop: 30,
        }}
      >
        <Text className="text-[#A9A9A9]">User name</Text>
        <TextInput
          style={{
            fontSize: 18,
            paddingBottom: 6,
            paddingTop: 6,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
          placeholder="Username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
      </View>
      <View
        style={{
          width: 314,
          marginTop: 30,
        }}
      >
        <Text className="text-[#A9A9A9]">Password</Text>
        <TextInput
          style={{
            fontSize: 18,
            paddingBottom: 6,
            paddingTop: 6,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={{
          width: 314,
          marginTop: 30,
        }}
      >
        <Text className="text-[#A9A9A9]">Image</Text>
        <TextInput
          style={{
            fontSize: 18,
            paddingBottom: 6,
            paddingTop: 6,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
          placeholder="Image"
          value="https://i.postimg.cc/c1VRS8Py/OIP.jpg"
          onChangeText={(text) => setPhoto(text)}
        />
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-[#FA4A0C] py-[25px] rounded-full  px-[134px]"
        >
          <Text className="text-white text-[17px] font-semibold ">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
