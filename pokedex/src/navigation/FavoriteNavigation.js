import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../screens/Favorite";
import PokemonScreen from "../screens/Pokemon";

const Stack = createNativeStackNavigator();

export default function FavoriteNavigation() {
  return (
    //screenOptions={{headerTitleAlign: 'center'}} //centra el header
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: "center", headerShadowVisible: false }}
    >
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        // options={{ title: "Favoritos" }}
        options={{
          title: "Favoritos",
          headerStyle: {
            backgroundColor: "#6b57ff",
          },

          headerTitleStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
