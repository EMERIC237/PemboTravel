import React, { useEffect, useState } from "react";
import PemboNavigation from "./navigation/PemboNavigation";
import { init } from "./utils/database";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setIsReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!isReady) {
    return <AppLoading />;
  }
  return (
    //*the screen wont display if it wrapped in a view without the flex = 1 !
    <Provider store={store}>
      <PemboNavigation />
    </Provider>
  );
}
