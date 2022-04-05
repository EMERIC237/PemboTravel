import {
  SET_PROJECTS,
  UPDATE_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  ADD_CONTRIBUTOR,
} from "../actions/projectActions";
const initialState = {
  projects: [],
  userProjects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        projects: action.projects,
        userProjects: action.projects.filter((project) =>
          project.contributors.includes(action.userId)
        ),
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case UPDATE_PROJECT:
      const updatedProjects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          const updatedProject = {
            ...project,
            projectName: action.payload.projectName,
            description: action.payload.description,
            price: action.payload.price,
            projectImg: action.payload.projectImg,
          };
          return updatedProject;
        }
        return project;
      });
      return {
        ...state,
        projects: updatedProjects,
      };
    case DELETE_PROJECT:
      const filteredProjects = state.projects.filter(
        (project) => project.id !== action.payload.projectId
      );
      return {
        ...state,
        projects: filteredProjects,
      };
    case ADD_CONTRIBUTOR:
      const updatedUserProjects = state.userProjects.map((project) => {
        if (project.id === action.payload.projectId) {
          const updatedProject = {
            ...project,
            contributors: [...project.contributors, action.payload.userId],
          };
          return updatedProject;
        }
        return project;
      });
      const updatedProjects2 = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          const updatedProject = {
            ...project,
            contributors: [...project.contributors, action.payload.userId],
          };
          return updatedProject;
        }
        return project;
      });
      return {
        ...state,
        userProjects: updatedUserProjects,
        projects: updatedProjects2,
      };

    default:
      return state;
  }
};
