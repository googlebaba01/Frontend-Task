import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { loggedUserContext } from './../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [currentUser] = useContext(loggedUserContext);

    return (
        <Route
            {...rest}
            element={currentUser.email ? children : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
