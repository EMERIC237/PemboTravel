import React from "react";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProjectsScreen from "../screens/ProjectsScreen";
import DetailProjectScreen from "../screens/DetailProjectScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import SplashScreen from "../screens/SplashScreen";
import AuthScreen from "../screens/AuthScreen";
import PaymentScreen from "../screens/PaymentScreen";
import DetailContributionScreen from "../screens/DetailContributionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import UserProjectScreen from "../screens/UserProjectScreen";
import AdminScreen from "../screens/AdminScreen";
import CreateProjectsScreen from "../screens/CreateProjectsScreen";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  // headerTitleStyle: {
  //   fontFamily: "Cochin",
  // },
  // headerBackTitleStyle: {
  //   fontFamily: "Cochin",
  // },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProjectStack = createNativeStackNavigator();

const ProjectStackNavigator = () => {
  return (
    <ProjectStack.Navigator
      initialRouteName="Splash"
      screenOptions={defaultNavOptions}
    >
      <ProjectStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <ProjectStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerTitle: "Authenticate" }}
      />
      <ProjectStack.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{ title: "All our projects" }}
      />

      <ProjectStack.Screen
        name="userProjects"
        component={UserProjectScreen}
        options={{ title: "My Projects projects" }}
      />
      <ProjectStack.Screen
        name="Details"
        component={DetailProjectScreen}
        options={({ route }) => ({
          title: route.params.projectName,
        })}
      />

      <ProjectStack.Screen
        name="Subscribe"
        component={SubscriptionScreen}
        initialParams={{ projectId: null }}
      />
    </ProjectStack.Navigator>
  );
};
const PaymentStack = createNativeStackNavigator();

const PaymentStackNavigator = () => {
  return (
    <PaymentStack.Navigator screenOptions={defaultNavOptions}>
      <PaymentStack.Screen
        name="Payment"
        component={PaymentScreen}
        initialParams={{ imageUri: null, amount: "" }}
      />
      <PaymentStack.Screen
        name="DetailContribution"
        component={DetailContributionScreen}
      />
    </PaymentStack.Navigator>
  );
};

const AppTab = createBottomTabNavigator();
const AppTabNavigator = () => {
  return (
    <AppTab.Navigator
      activeColor="#e91e63"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
      }}
    >
      <AppTab.Screen
        name="ProjectsTab"
        component={ProjectStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <AppTab.Screen
        name="PaymentTab"
        component={PaymentStackNavigator}
        options={{
          tabBarLabel: "Payments",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-cash-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

const AdminStack = createNativeStackNavigator();
const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="Admin" component={AdminScreen} />
      <AdminStack.Screen name="AddProject" component={CreateProjectsScreen} />
    </AdminStack.Navigator>
  );
};
const AppDrawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <AppDrawer.Navigator initialRouteName="AppTab">
      <AppDrawer.Screen
        name="AdminStack"
        component={AdminStackNavigator}
        screenOptions={{ headerTitle: "Welcome Admin!" }}
      />
      <AppDrawer.Screen
        name="AppTab"
        component={AppTabNavigator}
        screenOptions={{ headerShown: false }}
      />
    </AppDrawer.Navigator>
  );
};

export default DrawerNavigator;
