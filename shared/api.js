import { API_URL } from './conf.js';

export function requestToJoinGame(requestData) {
    return fetch(`${API_URL}/start`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        }
    );
}

export function getToken() {
    const token = localStorage.getItem('playerToken');

    if (!token) {
        console.log('Error: No Token, redirecting to join page...');
        window.location.href = './join.html';
        return null;
    }

    return token;
}

export function setToken(token) {
    localStorage.setItem('playerToken', token);
}

export async function fetchStatus() {
    const token = getToken();

    try {
        const response = await fetch(`${API_URL}/status`, { headers: { token } });
        if (response.status === 200) {
            const statusData = await response.json();
            return statusData;
        } else {
            console.log('server Error', response);
        }
    } catch (ex) {
        console.log('Server unavailble', ex);
    }
    return null;
}

export async function sendWord(word) {
    const token = getToken();

    try {
        const response = await fetch(`${API_URL}/word`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify({ word })
        });
        if (response.status === 200) {
            return true;
        }
        if (response.status === 400) {
            return false;
        }
        console.log('server Error', response);
    } catch (ex) {
        console.log('Server unavailble', ex);
    }
    return false;
}

export async function fetchDrawing() {
    const token = getToken();

    try {
        const response = await fetch(`${API_URL}/drawing`, { headers: { token } });
        if (response.status === 200) {
            const drawingData = await response.json();
            return drawingData.draw;
        } else {
            console.log('server Error', response);
        }
    } catch (ex) {
        console.log('Server unavailble', ex);
    }
    return null;
}

export async function putDrawing(drawingData) {
    const token = getToken();

    try {
        const response = await fetch(`${API_URL}/drawing`, {
            // const response = await fetch(`https://cors-anywhere.herokuapp.com/draw-something-demo.herokuapp.com/api/drawing`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', token },
            body: JSON.stringify({ draw: drawingData })
        });
        if (response.status !== 200) {
            console.log('server Error', response);
        }
    } catch (ex) {
        console.log('Server unavailble', ex);
    }
}