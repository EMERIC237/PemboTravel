import React from "react";
import PemboNavigation from "./navigation/PemboNavigation";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    //*the screen wont display if it wrapped in a view without the flex = 1 !
    <Provider store={store}>
      <PemboNavigation />
    </Provider>
  );
}
