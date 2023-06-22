import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AppColor from "../consts/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function ListProduct({ data }) {
  const [favData, setFavData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getFromStorage();
  }, [isFocused]);

  const getFromStorage = async () => {
    const data = await AsyncStorage.getItem("favorite");
    setFavData(data != null ? JSON.parse(data) : []);
  };

  function onPressFunction(id) {
    navigation.navigate("Detail", { orchidId: id });
  }

  function renderProductItem(item) {
    return (
      <View style={styles.rootContainer} key={item.id}>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={onPressFunction.bind(this, item.id)}
        >
          {favData.includes(item.id) ? (
            <Ionicons
              style={{
                position: "absolute",
                top: 0,
                right: "4%",
                backgroundColor: "#d8dfff",
                padding: 5,
                borderRadius: 16,
                overflow: "hidden",
              }}
              name="heart"
              size={20}
              color="red"
            />
          ) : (
            <></>
          )}
          <View style={styles.left}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: item.imageUrl }}
              defaultSource={require("../assets/LoadingImage.png")}
            />
          </View>
          <View style={styles.right}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textOrigin}>{item.origin}</Text>
            <View style={styles.rating}>
              <Ionicons
                name="star"
                size={16}
                color={1 <= item.rating ? "#f7e72f" : "black"}
              />
              <Ionicons
                name="star"
                size={16}
                color={2 <= item.rating ? "#f7e72f" : "black"}
              />
              <Ionicons
                name="star"
                size={16}
                color={3 <= item.rating ? "#f7e72f" : "black"}
              />
              <Ionicons
                name="star"
                size={16}
                color={4 <= item.rating ? "#f7e72f" : "black"}
              />
              <Ionicons
                name="star"
                size={16}
                color={5 <= item.rating ? "#f7e72f" : "black"}
              />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return data.length !== 0 ? (
    <FlatList
      data={data}
      renderItem={({ item }) => renderProductItem(item)}
      scrollEnabled={false}
    />
  ) : (
    <View style={styles.emptyContainer}>
      <Image
        style={styles.emptyImage}
        source={require("../assets/EmptyOrchid.png")}
      />
      <Text style={styles.emptyText}>Preparing to update new Orchid</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: 180,
    marginBottom: 45,
    marginHorizontal: 30,
    borderRadius: 30,
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 30,
    flexDirection: "row",
    padding: 15,
  },
  left: {
    flex: 4,
    borderRadius: 30,
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  right: {
    flex: 4,
    paddingLeft: 20,
    justifyContent: "center",
  },
  textName: {
    fontSize: 20,
    fontWeight: "600",
  },
  textOrigin: {
    marginTop: 5,
    marginBottom: 15,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.4)",
  },
  rating: { flexDirection: "row", alignItems: "center" },
  ratingText: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: "center",
  },
  emptyImage: {
    width: "70%",
  },
  emptyText: {
    color: AppColor.blue,
    fontSize: 20,
    fontFamily: "Chalkboard SE",
  },
});
