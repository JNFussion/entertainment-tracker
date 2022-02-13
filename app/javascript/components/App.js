import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import Find from "./Find";
import Popular from "./Popular";
import Navbar from "./Navbar";
import TV from "./TV";
import SignUp from "./SignUp";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sign-up" element={<SignUp />} />
          <Route path="/:type/popular" element={<Popular />} />
          <Route path="/:type/find" element={<Find />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/tv/:id" element={<TV />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
