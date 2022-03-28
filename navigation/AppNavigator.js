import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectsScreen from "../screens/ProjectsScreen";
import DetailProjectScreen from "../screens/DetailProjectScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import SplashScreen from "../screens/SplashScreen";
import AuthScreen from "../screens/AuthScreen";
import PaymentScreen from "../screens/PaymentScreen";
import DetailContributionScreen from "../screens/DetailContributionScreen";

const MyStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator initialRouteName="Splash">
        <MyStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <MyStack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerTitle: "Authenticate" }}
        />
        <MyStack.Screen
          name="Projects"
          component={ProjectsScreen}
          options={{ title: "All our projects" }}
        />
        <MyStack.Screen
          name="Details"
          component={DetailProjectScreen}
          options={({ route }) => ({
            title: route.params.projectName,
          })}
        />
        <MyStack.Screen
          name="Payment"
          component={PaymentScreen}
          initialParams={{ imageUri: null, amount: "" }}
        />
        <MyStack.Screen
          name="DetailContribution"
          component={DetailContributionScreen}
        />
        <MyStack.Screen name="Subscribe" component={SubscriptionScreen} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
