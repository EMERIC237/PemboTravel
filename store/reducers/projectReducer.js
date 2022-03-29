import { PROJECTS } from "../../data/dummy-data";
const initialState = {
  projects: PROJECTS,
  userProjects: PROJECTS.filter((project) => project.userId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
};
