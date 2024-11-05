import React, { useContext, useState } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import { loggedUserContext } from './../../App';

const CreatePost = () => {
    const [currentUser] = useContext(loggedUserContext); // Removed setCurrentUser
    const [createPost, setCreatePost] = useState({
        title: '',
        body: '',
        userId: currentUser.id
    });

    const handleIChange = (e) => {
        const { name, value } = e.target;
        setCreatePost((prevContent) => {
            return {
                ...prevContent,
                [name]: value
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log(createPost);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(createPost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
        
        // Resetting the form after submission
        setCreatePost({ title: '', body: '', userId: currentUser.id });
    };

    return (
        <Container>
            <Card className="createPost-card">
                <Card.Title>Create a new post</Card.Title>
                <Form onSubmit={handleSubmit}> {/* Changed form to use Form from react-bootstrap */}
                    <div className="form-group col-md-8">
                        <Form.Control
                            type="text"
                            id="title"
                            name="title"
                            value={createPost.title}
                            onChange={handleIChange}
                            placeholder="Enter Post title"
                        />
                        <Form.Control 
                            as="textarea" 
                            id="body"
                            name="body"
                            value={createPost.body}
                            onChange={handleIChange}
                            placeholder="Post Body"
                            rows={4} 
                            className="mb-4"
                        />
                        <Button variant="info" type="submit">Submit Post</Button> {/* Changed onClick to type="submit" */}
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default CreatePost;
