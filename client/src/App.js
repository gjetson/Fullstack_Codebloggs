import React from "react";
import { Route, Routes } from "react-router-dom";

//components imports
import LoginSubmit from "./components/Login";
import RegisterSubmit from "./components/Register";




const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginSubmit />} />
                <Route path="/register" element={<RegisterSubmit />} />
            </Routes>
        </div>
    );
};

export default App;