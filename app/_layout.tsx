import { Stack } from "expo-router";

import { StatusBar, StyleSheet, View } from "react-native";
import "./global.css";


export default function RootLayout() {
  return (
    <>
    <StatusBar hidden={true} />


        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        </Stack>


  </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "black", // Set the background color to black
  },
});
