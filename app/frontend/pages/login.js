import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {login} from "../services/backend";
import {setValue} from "../services/localStorage";

function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();
        login(event.target[0].value,event.target[1].value).then((result)=>{
            if(result.status == 200){
                setValue("token",result.token, result.exp);
                setValue("userId",result.user_id);
                setValue("username",result.username);
                setValue("role",result.role);
                window.location = "/todo";
            }

        })
    }


    return (
        <Container style={{marginTop: "3%"}}>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <p>If you don't register. You can <a href={"/signup"}>register.</a></p>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>

            </Row>
        </Container>
    );
}

export default Login;