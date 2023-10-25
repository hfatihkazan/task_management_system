import React,{useState} from "react"
import Select from 'react-select'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {deleteTask, createOrInitializeTask} from "../services/backend";
import {getValue} from "../services/localStorage";

function TaskContainer(params){
    const {id, label, items, developers} = params
    const authToken = getValue("token")["data"]
    const role = getValue("role")["data"]
    const developerOptions = developers.map((developer)=>{
        return {value: developer.id, label: developer.username}
    })
    const [action, setAction] = useState({
        action: null,
        developer: null,
        status: null
    })
    const statuses = [
        {value: 0, label: "Selected For Developers"},
        {value: 1, label: "In Progress"},
        {value: 2, label: "Done"},
    ]

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(action.action === "saveTask"){
            createOrInitializeTask(authToken, {
                id: event.target.id,
                description: event.target[0].value,
                story_point: event.target[1].value,
                user_id: action.developer.value,
                status: action.status.value
            })

        }else if(action.action === "deleteTask"){
            deleteTask(authToken, event.target.id).then(()=>{
            })
        }
        window.location.reload();
    }


    return(
        <>

            <h4 style={{marginTop:"2%",marginBottom:"3%"}}>{label}</h4>
            { items &&
                items.map((item)=>{
                    if(item.status === id){
                        let developer = developerOptions.find((developer)=> developer.value === item["user_id"])
                        let status = statuses.find((status)=> status.value === item.status)
                        return(
                            <Form id={item.id} style={{marginTop: "2%"}} onSubmit={handleSubmit}>
                                <Container id={item.id} style={{borderStyle:"solid",borderWidth: "thin", height: "25vh",paddingTop:"3%"}}>
                                    <div className="form-group" style={{textAlign:"left"}}>
                                        <label htmlFor="exampleInputEmail1">Description</label>
                                        <input disabled={role === 0} type="text" defaultValue={item.description} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" />
                                        <Row style={{marginTop:"3%"}}>
                                            <Col className={"col-sm-4"}>
                                                <label htmlFor="exampleInputEmail1">Story Point</label>
                                                <input disabled={role === 0} type="number" defaultValue={item["story_point"]} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Story Point" />
                                            </Col>
                                            <Col className={"col-sm-4"}>
                                                <label htmlFor="exampleInputEmail1">Developer</label>
                                                <Select options={developerOptions} defaultValue={developer} onChange={(value)=>developer = value}/>
                                            </Col>
                                            <Col className={"col-sm-4"}>
                                                <label htmlFor="exampleInputEmail1">Status</label>
                                                {role === 0 &&
                                                    <input disabled={role === 0} type="text" defaultValue={status.label} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" />
                                                }
                                                {role === 1 &&
                                                    <Select options={statuses} defaultValue={status} onChange={(value)=>status = value}/>
                                                }

                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:"3%"}}>
                                            <Col>
                                                <Button onClick={()=>{setAction({action:"saveTask",developer: developer, status: status})}} variant="primary" type="submit">
                                                    Save
                                                </Button>
                                            </Col>
                                            {role === 1 &&
                                                <Col>
                                                    <Button onClick={()=>{setAction({action:"deleteTask",developer: developer, status: status})}} variant="primary" type="submit">
                                                        Delete
                                                    </Button>
                                                </Col>
                                            }

                                        </Row>
                                    </div>
                                </Container>
                            </Form>
                        )
                    }


                })
            }

        </>
    )
}export default TaskContainer