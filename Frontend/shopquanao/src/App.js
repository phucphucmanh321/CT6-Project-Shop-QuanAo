import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/users" element={<UserList />} />

                <Route path="/users/:id" element={<UserDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
