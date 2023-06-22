import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/main/HomeScreen";
import FavoriteScreen from "./screens/main/FavoriteScreen";
import ItemDetailScreen from "./screens/main/ItemDetailScreen";
import Todo from "./screens/todo/Todo";
import { Ionicons } from "@expo/vector-icons";
import AppColor from "./consts/colors";
import CustomDrawer from "./components/CustomDrawer";
import { Image } from "react-native";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigators() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // tabBarLabel: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "flower" : "flower-outline"}
              size={focused ? 30 : 25}
              color={color}
            />
          ),
          tabBarActiveTintColor: "green",
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          // tabBarLabel: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={focused ? 30 : 25}
              color={color}
            />
          ),
          tabBarActiveTintColor: "red",
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigators() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: AppColor.button,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "black",
        headerStyle: {
          backgroundColor: AppColor.blue,
        },
        headerTintColor: "white",
        headerTitle: "",
      }}
    >
      <Drawer.Screen
        // name="Home"
        // component={HomeScreen}
        name="TabHome"
        component={BottomTabNavigators}
        options={{
          title: "Store",
          drawerIcon: ({ color, focused }) => (
            <Ionicons
              name="ios-home-outline"
              size={focused ? 35 : 22}
              color={color}
            />
          ),
          // headerStyle: {
          //   backgroundColor: AppColor.blue,
          // },
          headerRight: () => {
            return (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 20,
                  marginBottom: 20,
                }}
                source={require("./assets/avatar.jpg")}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Todo"
        component={Todo}
        options={{
          title: "Todo",
          headerTitle: "Todo",
          drawerIcon: ({ color, focused }) => (
            <Ionicons
              name="albums-outline"
              size={focused ? 35 : 22}
              color={color}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="FavoriteDrawer"
        component={FavoriteScreen}
        options={{          drawerIcon: ({ color, focused }) => (
            <Ionicons
              name="albums-outline"
              size={focused ? 35 : 22}
              color={color}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            // name="Home"
            // component={HomeScreen}
            name="DrawerHome"
            component={DrawerNavigators}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Detail" component={ItemDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
