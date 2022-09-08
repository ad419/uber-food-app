import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import LandingPage from "./screens/LandingPage";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WishList from "./screens/WishList";
import Notification from "./screens/Notification";
import ModalCart from "./screens/ModalCart";
import Orders from "./screens/Orders";
import { Octicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Cart from "./screens/Cart";
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import ProductDetails from "./screens/ProductDetails";
import { Provider } from "react-redux";
import { store } from "./store";
import { useSelector } from "react-redux";
import { selectBasketItems } from "./features/basketSlice";
import DeliveryView from "./screens/DeliveryView";
import RestaurantScreen from "./screens/RestaurantScreen";
import { selectNotificationItems } from "./features/notificationSlice";
import Splash from "./screens/Splash";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => {
  const basket_items = useSelector(selectBasketItems);
  const notification_items = useSelector(selectNotificationItems);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          opacity: 0.9,
          height: 115,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          elevation: 0,
          position: "absolute",
          backgroundColor: "#F5F5F8",
          paddingLeft: 10,
          paddingRight: 10,
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Foundation name="home" size={35} color="#F54748" />
              ) : (
                <Octicons name="home" size={30} color="#F54748" />
              )}
            </View>
          ),
        }}
        name="Home12"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <AntDesign name="heart" size={30} color="#F54748" />
              ) : (
                <AntDesign
                  className="font-extrabold"
                  name="hearto"
                  size={30}
                  color="#F54748"
                />
              )}
            </View>
          ),
        }}
        name="Wishlist"
        component={WishList}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View>
                  <Octicons name="bell-fill" size={30} color="#F54748" />
                  {notification_items.length ? (
                    <View
                      style={{
                        position: "absolute",
                        top: -14,
                        right: -10,
                        backgroundColor: "green",
                        padding: 2,
                        paddingLeft: 7,
                        paddingRight: 7,
                        borderRadius: 9999,
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        {notification_items.length}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : (
                <View>
                  <Octicons name="bell" size={30} color="#F54748" />
                  {notification_items.length ? (
                    <View
                      style={{
                        position: "absolute",
                        top: -14,
                        right: -10,
                        backgroundColor: "green",
                        padding: 2,
                        paddingLeft: 7,
                        paddingRight: 7,
                        borderRadius: 9999,
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        {notification_items.length}
                      </Text>
                    </View>
                  ) : null}
                </View>
              )}
            </View>
          ),
        }}
        name="Notifications"
        component={Notification}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <>
                  <Ionicons
                    style={{
                      fontWeight: "bold",
                    }}
                    name="md-cart-sharp"
                    size={35}
                    color="#F54748"
                  />
                  <View
                    style={{
                      position: "absolute",
                      right: 3,
                      top: -14,
                      backgroundColor: "#FA4A0C",
                      paddingLeft: 6,
                      paddingRight: 6,
                      borderRadius: 99999,
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      {basket_items.length}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Ionicons
                    style={{
                      fontWeight: "bold",
                    }}
                    name="md-cart-outline"
                    size={35}
                    color="#F54748"
                  />
                  <View
                    style={{
                      position: "absolute",
                      right: 3,
                      top: -14,
                      backgroundColor: "#FA4A0C",
                      paddingLeft: 6,
                      paddingRight: 6,
                      borderRadius: 99999,
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      {basket_items.length}
                    </Text>
                  </View>
                </>
              )}
            </View>
          ),
        }}
        name="Cart"
        component={Cart}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" animated translucent />
      <NavigationContainer>
        <Provider store={store}>
          <TailwindProvider>
            <Stack.Navigator>
              <Stack.Screen
                options={{
                  headerShown: false,
                  presentation: "fullScreenModal",
                }}
                name="Splash"
                component={Splash}
              />
              <Stack.Screen name="Landing Page" component={LandingPage} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Home"
                component={TabNav}
              />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Product"
                component={ProductDetails}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                  presentation: "modal",
                }}
                name="ModalCart"
                component={ModalCart}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                  presentation: "fullScreenModal",
                }}
                name="Delivery"
                component={DeliveryView}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Orders"
                component={Orders}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Restaurants"
                component={RestaurantScreen}
              />
            </Stack.Navigator>
          </TailwindProvider>
        </Provider>
      </NavigationContainer>
    </>
  );
}
