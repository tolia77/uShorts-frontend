import Layout from "./components/Layout";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/styles/App.scss';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilesIndex from "./pages/profiles/ProfilesIndex";
import ProfilesShow from "./pages/profiles/ProfilesShow";
import ProfilesCreate from "./pages/profiles/ProfilesCreate";
import ProfilesSearch from "./pages/profiles/ProfilesSearch";

function App() {
  return(
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
              <Route index element={<Home/>}/>
              <Route path={"login"} element={<Login/>}/>
              <Route path={"signup"} element={<Signup/>}/>
              <Route path={"profiles"} element={<ProfilesIndex/>}/>
              <Route path={"profiles/:name"} element={<ProfilesShow/>}/>
              <Route path={"profiles/search"} element={<ProfilesSearch/>}/>
              <Route path={"profiles/create"} element={<ProfilesCreate/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
