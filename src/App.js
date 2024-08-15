import Layout from "./components/Layout";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilesIndex from "./pages/profiles/ProfilesIndex";

function App() {
  return(
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
              <Route index element={<Home/>}/>
              <Route path={"login"} element={<Login/>}/>
              <Route path={"signup"} element={<Signup/>}/>
              <Route path={"profiles"} element={<ProfilesIndex/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
