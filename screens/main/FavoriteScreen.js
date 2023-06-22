import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { ORCHIDS } from "../../data/orchids";
import { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "../../components/ListItem";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

export default function FavoriteScreen() {
  const [favData, setFavData] = useState([]);

  const isFocused = useIsFocused();

  let dataFav;
  if (favData != null)
    dataFav = ORCHIDS.filter((item) => favData.includes(item.id));
  else dataFav = [];

  useEffect(() => {
    getFromStorage();
  }, [isFocused]);

  const getFromStorage = async () => {
    const storageData = await AsyncStorage.getItem("favorite");
    setFavData(storageData != null ? JSON.parse(storageData) : []);

    if (favData != null && storageData != null)
      dataFav = ORCHIDS.filter((item) =>
        JSON.parse(storageData).includes(item.id)
      );
    else dataFav = [];
  };

  const removeAllStorage = async () => {
    Alert.alert("Are you sure?", "You are removing all your favorite", [
      {
        text: "No",
        onPress: () => {},
        style: "destructive",
      },
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.clear();
          setFavData([]);
          dataFav = [];
        },
      },
    ]);
  };

  const removeDataFromStorage = async (id) => {
    const list = favData.filter((item) => item !== id);
    await AsyncStorage.setItem("favorite", JSON.stringify(list));
    setFavData(list);
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <Text style={{ marginVertical: 30, fontSize: 40, textAlign: "center" }}>
        My favorite
      </Text>
      {dataFav.length !== 0 ? (
        <>
          <TouchableOpacity
            style={{ marginLeft: 30 }}
            onPress={removeAllStorage}
          >
            <Text
              style={{
                fontSize: 18,
                color: "rgba(0, 0, 0, 0.5)",
                marginBottom: 10,
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>
          <ListItem
            data={dataFav}
            removeDataFromStorage={removeDataFromStorage}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require("../../assets/EmptyBox.png")}
          />
          <Text style={styles.emptyText}>What is your favorite Orchid?</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  emptyContainer: {
    height: 500,
    justifyContent: "center",
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
