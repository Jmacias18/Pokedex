import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/Account";

const Stack = createNativeStackNavigator();

export default function AccountNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        // options={{ title: "Mi cuenta" }}
        options={{
          title: "Mi cuenta",
          headerStyle: {
            backgroundColor: "#6b57ff",
          },

          headerTitleStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
        }}
      />
    </Stack.Navigator>
  );
}
