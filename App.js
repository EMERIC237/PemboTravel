import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    //*the screen wont display if it wrapped in a view without the flex = 1 !
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
