export async function createService(action) {
    var response = await fetch("/api/checkout", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(action.payload)
    })
    response = await response.json()
    return response
}

export async function getService(action) {
    var response = await fetch("/api/checkout", {
        method: "get",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token")
        }
    })
    response = await response.json()
    return response
}

export async function getUserService(action) {
    var response = await fetch("/api/checkout/" + localStorage.getItem("userid"), {
        method: "get",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token")
        }
    })
    response = await response.json()
    return response
}
export async function updateService(action) {
    var response = await fetch("/api/checkout/" + action.payload._id, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(action.payload)
    })
    response = await response.json()
    return response
}

export async function deleteService(action) {
    var response = await fetch("/api/checkout/" + action.payload._id, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token")
        }
    })
    response = await response.json()
    return response
}