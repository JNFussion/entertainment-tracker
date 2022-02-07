import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import MoviesFind from "./MoviesFind";
import MoviesPopular from "./MoviesPopular";
import Navbar from "./Navbar";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/popular" element={<MoviesPopular />} />
          <Route path="/movies/find" element={<MoviesFind />} />
          <Route path="/movies/:id" element={<Movie />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
