import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola, Coder!</Text>
      <Text>Hecho por Ignacio Calace</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AEC09A",
    alignItems: "center",
    justifyContent: "center",
  },
});
