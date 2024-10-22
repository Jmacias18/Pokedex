import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Image, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import FavoriteNavigation from "./FavoriteNavigation";
import PokedexNavigation from "./PokedexNavigation";
import AccountNavigation from "./AccountNavigation";
// import Favorite from "../screens/Favorite"
// import PokedexScreen from "../screens/Pokedex";
import Account from "../screens/Account";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Pokedex"
      screenOptions={{ headerShown: false }} //quita el header de la navegacion
      tabBarOptions={{
        activeTintColor: "#000",
        // activeBackgroundColor: "#fccf00",
        // inactiveTintColor: "#FFF",
        // inactiveBackgroundColor: "#2468b1",
        activeBackgroundColor: "#E8E8E8",
        activeTintColor: "#6b57ff", //"#2196f3",
        inactiveTintColor: "grey",
        inactiveBackgroundColor: "white",
        tabStyle: {
          //   padding: 5,
          paddingBottom: 5, //Padding 0 here
          paddingTop: 5,
        },
        // labelStyle: {
        //   marginBottom: 10,
        // },
      }}
    >
      <Tab.Screen
        name="Favorite"
        component={FavoriteNavigation}
        options={{
          tabBarLabel: "Favorites ",
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Pokedex"
        component={PokedexNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => renderPokeball(),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function renderPokeball() {
  return (
    <Image
      source={require("../assets/pokeball.png")}
      style={{ width: 75, height: 75, top: -15 }}
    />
  );
}
