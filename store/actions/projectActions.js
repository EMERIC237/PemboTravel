import { db } from "../../firebase";
import {
  serverTimestamp,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDocsFromCache,
} from "firebase/firestore";
import Project from "../../models/project";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const SET_PROJECTS = "SET_PROJECTS";
export const ADD_CONTRIBUTOR = "ADD_CONTRIBUTOR";

export const setProjets = () => {
  return async (dispatch, getState) => {
    try {
      //get the user id
      const userId = getState().auth.userCredentials.userId;
      let projects = [];
      let querySnapshot = [];
      queryFromCache = await getDocsFromCache(collection(db, "projects"));
      if (queryFromCache.length) {
        querySnapshot = queryFromCache;
      } else {
        querySnapshot = await getDocs(collection(db, "projects"));
      }
      querySnapshot.forEach((doc) => {
        projects.push({ projectId: doc.id, ...doc.data() });
      });
      dispatch({ type: SET_PROJECTS, projects, userId });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};

/**
 * function to create a new project
 * @param {string} projectName
 * @param {string} description
 * @param {string} price
 * @param {string} projectImg
 * @returns a dispatch function
 */
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

/**
 *
 * @param {string} projectId
 * @param {string} projectName
 * @param {string} description
 * @param {string} price
 * @param {string} projectImg
 * @returns a dispatch function to update a project
 */
export const updateProject = (
  projectId,
  projectName,
  description,
  price,
  projectImg
) => {
  return async (dispatch) => {
    try {
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, {
        city: projectName,
        description: description,
        price: price,
        imageUrl: projectImg,
      });
      dispatch({
        type: UPDATE_PROJECT,
        payload: {
          projectId: projectId,
          city: projectName,
          description: description,
          price: price,
          imageUrl: projectImg,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};

//function to delete a project
/**
 *
 * @param {string} projectId
 * @returns
 */
export const deleteProject = (projectId) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};

export const addContributor = (projectId, userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_CONTRIBUTOR,
        payload: {
          projectId: projectId,
          userId: userId,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};
