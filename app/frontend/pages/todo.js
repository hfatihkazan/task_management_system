import React,{useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskContainer from "../components/taskContainer";
import {getUsers, getTasks} from "../services/backend"
import {getValue} from "../services/localStorage";

function  Todo(){
    const [tasks, setTasks] = useState([])
    const [developers, setDevelopers] = useState([])
    const authToken = getValue("token")["data"]
    const role = getValue("role")["data"]

    useEffect(()=>{
        getUsers(authToken).then((result)=>{
            setDevelopers([{id: "-1", username: "Auto Assign"},...result])
        });

        getTasks(authToken).then((result)=>{
            setTasks(result)
        });
    },[])


    return(
        <div>
            <Container fluid>
                {role === 1 &&
                    <Row>
                        <button style={{marginTop:"2%",marginLeft:"2%"}} type="button" className="btn btn-primary"
                                onClick={()=>{
                                    setTasks([ ...[{
                                        id: null,
                                        description: "",
                                        status: 0,
                                        storyPoint: null,
                                        user_id: 0
                                    }], ...tasks])
                                }}>
                            Add New Task
                        </button>
                    </Row>
                }

                <Row id={"task-row"}>

                    <Col>
                        <TaskContainer id={0} label={"Selected For Developers"} items={tasks} developers={developers}/>
                    </Col>
                    <Col>
                        <TaskContainer id={1} label={"In Progress"} items={tasks} developers={developers}/>
                    </Col>
                    <Col>
                        <TaskContainer id={2} label={"Done"} items={tasks} developers={developers}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}export default Todo