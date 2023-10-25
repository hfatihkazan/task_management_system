async function postRequest(authToken, body, endpoint){
    return await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': authToken
        },
    })
        .then((response) => {return response.json()} )
        .then((data)=>{
            return data;
        })
        .catch((err) => {
            console.log(err.message);
            return {}
        });


}


async function getRequest(endpoint, authToken, method){
    let header = {
        "Content-Type": "application/json"
    }
    if(authToken){
        header["Authorization"] = "Bearer "+ authToken
    }

    return await fetch(endpoint, {
        method: method,
        headers: header,
    })
        .then((response) => {return response.json()} )
        .then((data)=>{
            return data;
        })
}

export async function registerUser(email,username,password){
    return await postRequest(null, {
        email:email,
        username: username,
        password: password
        },
        "http://localhost:3000/users"
    )
}

export async function login(email,password){
    return await postRequest(null, {
            email:email,
            password: password
        },
        "http://localhost:3000/login"
    )
}

export async function updateTasks(authToken, user_id ,tasks){
    return await postRequest(authToken, {

        },
        "http://localhost:3000/login"
    )
}

export async function getUsers(authToken){
    return await getRequest("http://localhost:3000/users/developers",authToken, "GET")
}

export async function getTasks(authToken){
    return await getRequest("http://localhost:3000/tasks",authToken, "GET")
}

export async function createOrInitializeTask(authToken,body){
    return await postRequest(authToken,body,"tasks/initialize_or_update")
}

export async function deleteTask(authToken, taskId){
    return await getRequest("http://localhost:3000/tasks/"+taskId,authToken, "DELETE")
}