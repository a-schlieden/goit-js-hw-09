
const refs = {
    btnStartEl: document.querySelector('button[data-start]'),
    btnStopEl: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector("body"),
};
let intervalId = null;

refs.btnStartEl.addEventListener("click", onBgcolorChangeStart);
refs.btnStopEl.addEventListener("click", onBgcolorChangeStop);

console.log(refs.btnStartEl)

function onBgcolorChangeStart() {
    console.log('start')
    refs.btnStartEl.disabled = true;
    intervalId = setInterval(getRandomHexColor, 1000);
}

function onBgcolorChangeStop() {
    console.log('stop')
    clearInterval(intervalId);
    refs.btnStartEl.disabled = false;
}



function getRandomHexColor() {
    return refs.bodyEl.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}