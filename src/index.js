import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { APIService, setUpInterceptors } from "./axios/client";

setUpInterceptors(APIService);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
