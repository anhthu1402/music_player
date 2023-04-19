import "./App.css";
import SideBar from "./components/SideBar";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="main">
      <Router>
        <SideBar />
        <div style={{ margin: `20px 50px` }}>
          <Header className="header" />
          <Routes>
            <Route path="/library?type=song" exact Component={Library} />
            <Route path="/home" exact Component={Home} />
            <Route path="/signIn" exact Component={SignIn} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
