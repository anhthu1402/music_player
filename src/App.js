import "./App.css";
import SideBar from "./components/SideBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Header from "./components/Header";
import Signin from "./pages/SignIn";
import NewSongs from "./pages/NewSongs";
import MyRecently from "./pages/MyRecently";

function App() {
  return (
    <div>
      <Router>
        <div style={{ width: `260px`, position: `fixed`, top: `0`, left: 0 }}>
          <SideBar />
        </div>
        <div
          style={{
            padding: `20px 50px`,
            width: `calc(100% - 260px)`,
            position: `relative`,
            left: `260px`,
          }}
        >
          <Header className="header" />
          <Routes>
            <Route path="/library" exact Component={Library} />
            <Route path="/" exact Component={Home} />
            <Route path="/signIn" exact Component={Signin} />
            <Route path="/newsongs" exact Component={NewSongs} />
            <Route path="/recently" exact Component={MyRecently} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
