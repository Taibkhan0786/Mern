export async function createService(action) {
    var response = await fetch("/api/product", {
        method: "post",
        headers: {
            "authorization":localStorage.getItem("token")
        },
        body: action.payload
    })
    response = await response.json()
    return response
}

export async function getService(action) {
    var response = await fetch("/api/product", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    response = await response.json()
    return response
}

export async function updateService(action) {
    var response = await fetch("/api/product/" + action.payload.get("_id"), {
        method: "put",
        headers: {
            "authorization":localStorage.getItem("token")
        },
        body: action.payload
    })
    response = await response.json()
    return response
}

export async function deleteService(action) {
    var response = await fetch("/api/product/" + action.payload._id, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "authorization":localStorage.getItem("token")
        }
    })
    response = await response.json()
    return response
}