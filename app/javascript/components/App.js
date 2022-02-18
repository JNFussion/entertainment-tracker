import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import Find from "./Find";
import Popular from "./Popular";
import Navbar from "./Navbar";
import TV from "./TV";
import SignUp from "./SignUp";
import Login from "./Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Monitoring from "./Monitoring";

export function pretty(str) {
  return str.split("_").join(" ");
}

export const UserContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    this.listenter = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.setState({
          currentUser: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  render() {
    return (
      <UserContext.Provider value={this.state.currentUser}>
        <BrowserRouter>
          <Navbar currentUser={this.state.currentUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:type/popular" element={<Popular />} />
            <Route path="/:type/find" element={<Find />} />
            <Route path="/monitoring/:type" element={<Monitoring />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/tv/:id" element={<TV />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
