import { STATUS_INTERVAL_MS, DRAW_INTERVAL_MS } from '../../shared/conf.js';
import { fetchStatus, fetchDrawing, putDrawing, sendWord } from '../../shared/api.js';
import CanvasFreeDrawing from '../../lib/canvas-free-drawing.js';

const scoreLabelSelector = '.score_label';
const scoreLabelElement = document.querySelector(scoreLabelSelector);
const currentDrawerLabelSelector = '.current_drawer_label';
const currentDrawerLabelElement = document.querySelector(currentDrawerLabelSelector);
const wordInputSelector = '.word_input';
const wordInput = document.querySelector(wordInputSelector);
const sendBtnSelector = '.send_btn';
const sendBtn = document.querySelector(sendBtnSelector);
const myWordSelector = '.my_word_label';
const myWordLabel = document.querySelector(myWordSelector);
const drawCanvasSelector = '.draw_canvas';
const drawCanvas = document.querySelector(drawCanvasSelector);
const showImgSelector = '.show_canvas';
const showImg = document.querySelector(showImgSelector);
const clearBtnSelector = '.clear-btn';
const clearBtn = document.querySelector(clearBtnSelector);
let isDrawer = false;
let drawerCanvas;

async function onSendWord() {
    const word = wordInput.value;
    const isCorrect = await sendWord(word);
    if (isCorrect) {
        alert('Correct!!! Yea!!! Prepare to be the drawer now!!!');
        drawerCanvas.clear();
    } else {
        alert('No... Try again');
    }
    updateStatus();
}

function onClearDraw() {
    drawerCanvas.clear();
}

function init() {
    sendBtn.addEventListener('click', onSendWord);
    clearBtn.addEventListener('click', onClearDraw);
    drawerCanvas = new CanvasFreeDrawing({
        elementId: 'drawCanvas',
        width: drawCanvas.clientWidth,
        height: drawCanvas.clientHeight,
    });
}

async function updateStatus() {
    const statusData = await fetchStatus();
    scoreLabelElement.innerHTML = statusData.me.points;
    isDrawer = statusData.me.id === statusData.round.drawerId;
    if (isDrawer) {
        currentDrawerLabelElement.innerHTML = 'Me!';
        sendBtn.parentElement.style.display = 'none';
        myWordLabel.parentElement.style.display = 'block';
        myWordLabel.innerHTML = statusData.round.word;
        drawCanvas.style.display = 'block';
        showImg.style.display = 'none';
    } else {
        currentDrawerLabelElement.innerHTML = statusData.round.drawer.name;
        sendBtn.parentElement.style.display = 'block';
        myWordLabel.parentElement.style.display = 'none';
        drawCanvas.style.display = 'none';
        drawerCanvas.clear();
        showImg.style.display = 'block';
    }
    console.log(statusData);
}

async function updateDrawing() {
    if (isDrawer) {
        const drawingData = drawCanvas.toDataURL();
        putDrawing(drawingData);
    } else {
        const imgData = await fetchDrawing();
        showImg.src = imgData;
        // var myImage = new Image();
        // myImage.src = imgData;
        // ctx.drawImage(myImage, 0, 0);
    }
}

function startStatusLoop() {
    setInterval(updateStatus, STATUS_INTERVAL_MS);
}

function startDrawingLoop() {
    setInterval(updateDrawing, DRAW_INTERVAL_MS);
}

init();
updateStatus();
startStatusLoop();
startDrawingLoop();