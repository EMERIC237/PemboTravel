import { PROJECTS } from "../../data/dummy-data";
const initialState = {
  projects: PROJECTS,
  userProjects: PROJECTS.filter((project) => project.userId === "u1"),
};

export default (state = initialState, action) => {
  switch (action) {
    default:
      return state;
  }
};
