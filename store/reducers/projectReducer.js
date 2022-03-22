import { PROJECTS } from "../../data/dummy-data";
const initialState = {
  projects: PROJECTS,
};

export default (state = initialState, action) => {
  switch (action) {
    default:
      return state;
  }
};
