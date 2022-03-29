import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./AppNavigator";

const PemboNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default PemboNavigation;
