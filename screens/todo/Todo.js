import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Todo() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>
        Assignment task <Text style={styles.innerText}>Todo.js</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
  },
  innerText: {
    color: "blue",
    fontWeight: "bold",
  },
});
