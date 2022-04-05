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
import uploadImageAsync from "../../utils/uploadImage";
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
      //Upload the image to firebase storage using blob
      const imageUrl = await uploadImageAsync(
        projectImg,
        `projects/${projectName}`
      );
      //define the structure of the project to be added
      const projectToAdd = {
        projectName,
        description,
        price,
        projectImg: imageUrl,
        contributors: [],
        createdAt: serverTimestamp(),
      };
      const project = await addDoc(collection(db, "projects"), projectToAdd);
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
        projectName: projectName,
        description: description,
        price: price,
        projectImg: projectImg,
      });
      dispatch({
        type: UPDATE_PROJECT,
        payload: {
          projectId: projectId,
          projectName,
          description,
          price,
          projectImg,
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
