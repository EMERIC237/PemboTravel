import { db } from "../../firebase";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import Project from "../../models/project";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const createProject = (projectName, description, price, projectImg) => {
  return async (dispatch) => {
    try {
      const projectToAdd = new Project(
        [],
        projectName,
        projectImg,
        price,
        description,
        serverTimestamp()
      );
      const { ...projectObj } = projectToAdd;
      const project = await addDoc(collection(db, "projects"), projectObj);
      console.log(project.id);
      dispatch({
        type: CREATE_PROJECT,
        payload: { ...projectToAdd, projectId: project.id },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};
