import React from "react";
import { Platform, TouchableOpacity } from "react-native";
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
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import UserProjectScreen from "../screens/UserProjectScreen";
import AdminScreen from "../screens/AdminScreen";
import CreateProjectsScreen from "../screens/CreateProjectsScreen";
import ValidateScreen from "../screens/ValidateScreen";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "" : Colors.primary,
  },
  headerTintColor: Platform.OS === "android" ? Colors.primary : "white",
};

const AdminStack = createNativeStackNavigator();
const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="Admin" component={AdminScreen} />
      <AdminStack.Screen
        name="AddProject"
        component={CreateProjectsScreen}
        options={{ headerShown: true, headerTitle: "Add Project" }}
      />
      <AdminStack.Screen
        name="Validate"
        component={ValidateScreen}
        options={{ headerShown: true, headerTitle: "Validate Projects" }}
      />
    </AdminStack.Navigator>
  );
};
const ProjectStack = createNativeStackNavigator();

const ProjectStackNavigator = () => {
  return (
    <ProjectStack.Navigator
      initialRouteName="Splash"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? "" : Colors.primary,
        },
        headerTintColor: Platform.OS === "android" ? Colors.primary : "white",
      })}
    >
      <ProjectStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <ProjectStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerTitle: "Welcome To Pembo Travel!",
        }}
      />
      <ProjectStack.Screen
        name="Projects"
        component={ProjectsScreen}
        options={({ navigation }) => ({
          title: "All our projects",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}
            >
              <Ionicons name="menu" size={26} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("userProjects");
              }}
            >
              <MaterialCommunityIcons
                name="playlist-check"
                size={26}
                color="white"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <ProjectStack.Screen
        name="userProjects"
        component={UserProjectScreen}
        options={({ navigation }) => ({
          title: "My Projects",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back" size={25} color="white" />
            </TouchableOpacity>
          ),
        })}
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
        initialParams={{ projectId: null, infos: null }}
      />
    </ProjectStack.Navigator>
  );
};

const AppDrawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <AppDrawer.Navigator
      initialRouteName="PemboStack"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
        drawerActiveBackgroundColor: "#f0e1f0",
        drawerActiveTintColor: "#3c0f0f",
      }}
    >
      <AppDrawer.Screen
        name="AdminStack"
        component={AdminStackNavigator}
        options={{
          headerShown: true,
          headerTitle: "Admin Only!",
          drawerLabel: "Admin",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="ios-settings" color={color} size={size} />
          ),
        }}
      />
      <AppDrawer.Screen
        name="PemboStack"
        component={ProjectStackNavigator}
        options={{
          drawerLabel: "Users",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          // headerTitle: "Pembo Projects",
          // headerRight: () => (
          //   <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>
          //     My Projects
          //   </Text>
          // ),
        }}
      />
    </AppDrawer.Navigator>
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
        options={({ navigation, route }) => ({
          headerTitle: "Contributions",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back" size={25} color="white" />
            </TouchableOpacity>
          ),
        })}
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
        component={DrawerNavigator}
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
          ...defaultNavOptions,
          headerShown: true,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AppTabNavigator;
