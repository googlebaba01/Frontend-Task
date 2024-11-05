import { createContext, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import { Helmet } from "react-helmet";
import Posts from "./Components/Posts/Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostDetails from "./Components/Posts/PostDetails";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import CreatePost from "./Components/Posts/CreatePost";
import UpdatePost from "./Components/Posts/UpdatePost";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/Route/PrivateRoute";

export const loggedUserContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState("");

    return (
        <loggedUserContext.Provider value={[currentUser, setCurrentUser]}>
            <Router>
                <Helmet>
                    <title>Gajendra Nagar | Globeia</title>
                </Helmet>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/post/update/:id"
                        element={
                            <PrivateRoute>
                                <UpdatePost />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/post/create"
                        element={
                            <PrivateRoute>
                                <CreatePost />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/post/:id" element={<PostDetails />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/users" element={<Users />} />

                    <Route
                        path="/"
                        element={
                            <>
                                <Hero />
                                <Posts />
                            </>
                        }
                    />

                    <Route path="*" element={<h3>404, Not found</h3>} />
                </Routes>
            </Router>
        </loggedUserContext.Provider>
    );
}

export default App;
