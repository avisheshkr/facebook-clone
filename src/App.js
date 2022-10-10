import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Topbar from "./components/topbar/Topbar";
import Messenger from "./pages/Messenger/Messenger";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        {user && <Topbar />}
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/messenger"
            element={user ? <Messenger /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
