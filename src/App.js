import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/stylesheet.css"

import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VolcanoList from "./pages/VolcanoList";
import Logout from "./pages/Logout";
import Volcano from "./pages/Volcano";

function App() {
    return (
        <BrowserRouter>
            <div className="background">
                    <div className="background-image"/>
            </div>
            <Header/>

            <div className="VolcanoApp">
                <Routes>
                    <Route path="/" element= { <Home/> } />
                    <Route path="/volcanoes" element = { <VolcanoList/> }/>
                    <Route path="/register" element = { <Register/> }/>
                    <Route path="/login" element = { <Login/> }/>
                    <Route path="/logout" element = { <Logout/> }/>
                    <Route path="/volcano" element = { <Volcano/> }/>
                </Routes>
            </div>
            
        </BrowserRouter>
    );
}

export default App;