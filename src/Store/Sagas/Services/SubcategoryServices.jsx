export async function createService(action) {
    var response = await fetch("/api/subcategory", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "authorization":localStorage.getItem("token")
        },
        body: JSON.stringify(action.payload)
    })
    response = await response.json()
    return response
}

export async function getService(action) {
    var response = await fetch("/api/subcategory", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    response = await response.json()
    return response
}

export async function updateService(action) {
    var response = await fetch("/api/subcategory/" + action.payload._id, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "authorization":localStorage.getItem("token")
        },
        body: JSON.stringify(action.payload)
    })
    response = await response.json()
    return response
}

export async function deleteService(action) {
    var response = await fetch("/api/subcategory/" + action.payload._id, {
        method: "delete",
        headers: {
            "content-type": "application/json",
            "authorization":localStorage.getItem("token")
        }
    })
    response = await response.json()
    return response
}