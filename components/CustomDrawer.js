import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AppColor from "../consts/colors";

export default function CustomDrawer(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: AppColor.button500 }}
      >
        <ImageBackground
          source={require("../assets/backround.jpg")}
          blurRadius={2}
          resizeMode="cover"
        >
          <View
            style={{
              backgroundColor: AppColor.button500,
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30,
              paddingBottom: 50,
              paddingLeft: 20,
            }}
          >
            <Image
              source={require("../assets/avatar.jpg")}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
            <Text
              style={{
                marginTop: 12,
                color: "white",
                fontSize: 18,
                fontWeight: "600",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: 10,
                overflow: "hidden",
                padding: 5,
              }}
            >
              User No1
            </Text>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 30 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          marginVertical: 40,
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ fontSize: 17, marginLeft: 20 }}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
