import React from "react";
import BasicPage from "./components/BasicPage";
import Auth from "./components/Auth";
import MoviesDB from "./components/MoviesDB";

function App() {
  return (
    <div>
      <Auth />
      <MoviesDB />
    </div>
  );
}

export default App;
