import { fetchStatus } from '../../shared/api.js';

const StatusContainerSelector = '.main-wrapper';

async function getStatus() {
    const statusData = await fetchStatus();
    if (statusData) {
        populateInfoContainer(statusData.players);
    } else {
        alert('Faild to get status');
    }
}

function populateInfoContainer(players) {
    const StatusContainerElement = document.querySelector(StatusContainerSelector);

    for (let player of players) {
        const playerInfoDiv = document.createElement('h2');
        playerInfoDiv.className = 'player-info';
        playerInfoDiv.innerText = `${player.name} - (${player.points})`;
        StatusContainerElement.appendChild(playerInfoDiv);
    }
}

getStatus();