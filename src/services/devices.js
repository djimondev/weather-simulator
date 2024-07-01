const BASE_URL = "http://35.239.214.252:3000";

export const getDevices = async () => {
    const response = await fetch(`${BASE_URL}/devices`);
    return response.json();
};

export const getDevice = async id => {
    const response = await fetch(`${BASE_URL}/devices/${id}`);
    return response.json();
};

export const createDevice = async device => {
    const response = await fetch(`${BASE_URL}/devices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(device)
    });
    return response.json();
};

export const updateDevice = async device => {
    const response = await fetch(`${BASE_URL}/devices/${device.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(device)
    });
    return response.json();
};

export const patchDevice = async (id, param) => {
    const response = await fetch(`${BASE_URL}/devices/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
    });
    return response.json();
};

export const deleteDevice = async id => {
    const response = await fetch(`${BASE_URL}/devices/${id}`, {
        method: "DELETE"
    });
    return response.json();
};
