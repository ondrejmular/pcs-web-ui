import { Provider } from "react-redux";

import { Router } from "app/view/share";
import { setupStore } from "app/store";

import { Notifications } from "./notifications";
import { EnsureLogin } from "./login";
import { AppPage } from "./AppPage";
import "./App.css";

export const App = ({ store = setupStore() }) => (
  <Provider store={store}>
    <EnsureLogin>
      <Router base="/ui">
        <AppPage />
        <Notifications />
      </Router>
    </EnsureLogin>
  </Provider>
);
