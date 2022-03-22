import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectsScreen from "../screens/ProjectsScreen";
import DetailProjectScreen from "../screens/DetailProjectScreen";

const MyStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator initialRouteName="Projects">
        <MyStack.Screen
          name="Projects"
          component={ProjectsScreen}
          options={{ title: "All our projects" }}
        />
        <MyStack.Screen name="Details" component={DetailProjectScreen} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
