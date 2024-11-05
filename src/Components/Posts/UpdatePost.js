import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Card, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { loggedUserContext } from './../../App';

const UpdatePost = () => {
    const { id } = useParams();
    const [currentUser] = useContext(loggedUserContext);
    const [updatePostResponse, setUpdatePostResponse] = useState(false);
    const [currentPostInfo, setCurrentPostInfo] = useState({});
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const postId = parseInt(id);
    const postUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    useEffect(() => {
        fetch(postUrl)
            .then((response) => response.json())
            .then((data) => setCurrentPostInfo(data));
    }, [postUrl]);

    const handleIChange = (e) => {
        const { name, value } = e.target;
        setCurrentPostInfo((prevContent) => ({
            ...prevContent,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(postUrl, {
            method: 'PUT',
            body: JSON.stringify(currentPostInfo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(() => {
                setUpdatePostResponse(true);
                setTimeout(() => {
                    setUpdatePostResponse(false);
                    navigate(`/users/${currentUser.id}`); // Use navigate instead of history.push
                }, 5000);
            })
            .catch((err) => console.log(err));
    };

    const handleUpdateCancel = () => {
        navigate(`/users/${currentUser.id}`); // Use navigate instead of history.push
    };

    return (
        <Container>
            <Card className="createPost-card">
                {updatePostResponse && <Alert variant="success">Post Updated</Alert>}
                <Card.Title>Update post</Card.Title>
                <form onSubmit={handleSubmit}>
                    <div className="form-group col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={currentPostInfo.title || ''}
                            onChange={handleIChange}
                            placeholder="Enter Post title"
                        />
                        <Form.Control
                            as="textarea"
                            id="body"
                            name="body"
                            value={currentPostInfo.body || ''}
                            onChange={handleIChange}
                            rows={4}
                            className="mb-4"
                        />
                        <Button variant="info" type="submit">Update Post</Button>
                        <Button variant="warning" className="ml-2" onClick={handleUpdateCancel}>Cancel</Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
};

export default UpdatePost;
