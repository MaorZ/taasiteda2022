import { requestToJoinGame, setToken } from '../../shared/api.js';

const joinBtnSelector = '.join-btn';
const nameInputSelector = '.name-input';

async function joinGame() {

    const nameInputElement = document.querySelector(nameInputSelector);

    if (!nameInputElement.value) {
        alert('Please enter a name');
        return;
    }

    const joinRequestData = { player: nameInputElement.value };

    try {
        const response = await requestToJoinGame(joinRequestData);
        if (response.status === 200) {
            const joinResponseData = await response.json();
            setToken(joinResponseData.token);
            window.location.href = './game.html';
        } else {
            alert('Error: Server Error!');
        }
    } catch (ex) {
        alert('Error: Server unavailble!');
        console.log('Error: Server unavailble!', ex);
    }
}

const joinBtnElement = document.querySelector(joinBtnSelector);

joinBtnElement.addEventListener('click', joinGame);