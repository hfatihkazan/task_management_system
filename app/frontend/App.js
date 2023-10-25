import React, {StrictMode} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login"
import Layout from "./components/layout";
import Todo from "./pages/todo"
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgotPassword";
import {checkIsAuth} from "./services/localStorage";
import ProtectedRoute from "./components/protectedRoute";

function App(){
    let isAuth = checkIsAuth()
    return(
        <BrowserRouter>
            <Layout isAuth={isAuth}/>
            <Routes >
                <Route index element={<ProtectedRoute isLoggedIn={isAuth}><Todo /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/todo" element={<ProtectedRoute isLoggedIn={isAuth}><Todo /></ProtectedRoute>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
        </BrowserRouter>

    )
}export default App;