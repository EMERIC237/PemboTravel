import {
  SET_PROJECTS,
  UPDATE_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
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
            city: action.payload.city,
            description: action.payload.description,
            price: action.payload.price,
            imageUrl: action.payload.imageUrl,
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

    default:
      return state;
  }
};
