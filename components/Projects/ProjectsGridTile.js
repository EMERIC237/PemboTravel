import {
  StyleSheet,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useCallback } from "react";
const ProjectsGridTile = ({ dataList, navigation }) => {
  const renderGridItem = useCallback((data) => {
    return (
      <TouchableOpacity
        style={styles.projectItem}
        onPress={() => {
          navigation.navigate("Details", {
            projectId: data.item.projectId,
            projectName: data.item.projectName,
          });
        }}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 6 }}
          source={{ uri: data.item.projectImg }}
          style={styles.image}
        >
          <Text style={styles.cityText}> {data.item.projectName}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataList}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.projectId}
      />
    </SafeAreaView>
  );
};

export default ProjectsGridTile;

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
    width: 350,
    height: 150,
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
