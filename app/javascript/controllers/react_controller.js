import { Controller } from "@hotwired/stimulus"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "../../frontend/App";
// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    console.log("launched frontend")

    const root = ReactDOM.createRoot(document.getElementById("app"))
    root.render(
        <App/>
    )
  }
}
