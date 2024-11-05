import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { loggedUserContext } from './../../App';

const Login = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [formInfo, setFormInfo] = useState({
        email: '',
        password: ''
    });
    const [currentUser, setCurrentUser] = useContext(loggedUserContext);
    const navigate = useNavigate(); // Use useNavigate
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const userUrl = `https://jsonplaceholder.typicode.com/users`;

    useEffect(() => {
        fetch(userUrl)
            .then((response) => response.json())
            .then((data) => setAllUsers(data));
    }, [userUrl]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const userId = prompt('Enter any number from 1 to 10');
        if (allUsers) {
            const loggedUser = allUsers.find(user => user.id === parseInt(userId));
            if (loggedUser) {
                setCurrentUser(loggedUser);
                navigate(from, { replace: true }); // Use navigate instead of history.replace
            } else {
                alert("User not found. Please enter a valid ID.");
            }
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setFormInfo((prevContent) => ({
            ...prevContent,
            [name]: value
        }));
    };

    return (
        <Container>
            <br />
            <br />
            {currentUser && <h5>Welcome, {currentUser.name}!</h5>} {/* Display logged-in user */}
            <div className="form-group col-md-8">
                <Button variant="info" className="btn-block" onClick={handleSubmit}>Click Here to Login</Button>
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formInfo.email}
                        onChange={handleLoginChange}
                        placeholder="Email"
                    />
                    <input 
                        type='password'
                        id="password"
                        name="password"
                        value={formInfo.password}
                        onChange={handleLoginChange}
                        placeholder="Password"
                        className="form-control"
                    /> 
                    <Button variant="info" type="submit">Login</Button>
                </div>
            </form>
        </Container>
    );
};

export default Login;
