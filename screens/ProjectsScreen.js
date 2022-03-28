import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useLayoutEffect } from "react";

import React from "react";
import { logout } from "../store/actions/authActions";

const ProjectsScreen = ({ navigation }) => {
  const allProjects = useSelector((state) => state.projects.projects);
  const dispacth = useDispatch();
  const onLogoutHandler = () => {
    dispacth(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button onPress={onLogoutHandler} title="Logout" />,
      headerRight: () => (
        <Button
          title="payment"
          onPress={() => {
            navigation.navigate("Payment");
          }}
        />
      ),
    });
  }, [navigation]);

  const renderGridItem = useCallback((data) => {
    return (
      <TouchableOpacity
        style={styles.projectItem}
        onPress={() => {
          navigation.navigate("Details", {
            projectId: data.item.id,
            projectName: data.item.city,
          });
        }}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 6 }}
          source={{ uri: data.item.imageUrl }}
          style={styles.image}
        >
          <Text style={styles.cityText}> {data.item.city}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allProjects}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  projectItem: {
    padding: 15,
  },
  image: {
    width: 300,
    height: 100,
    justifyContent: "center",
    borderRadius: 5,
  },
  cityText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(223, 230, 239, 0.25)",
  },
});