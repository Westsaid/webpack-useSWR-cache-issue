import { createElement } from "react";
import ReactDOM from "react-dom";
import TestComponent from "./Test.component";

const app = document.getElementById("root");
console.log("testwassolldas!!");
ReactDOM.render(
  createElement(TestComponent, {
    data: window.AppData?.NewsApp?.data,
    settings: window.AppData?.NewsApp?.settings
  }),
  app
);
