import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import MainRouter from "components/MainRouter";

import store from "store/storeSettings";
import "common/styles/layout.scss";

import './i18n';

const app = (
  <Provider store={store}>
    <MainRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
