
const refs = {
    backgroundColor: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
};
const COLOR_INTERVAL = 1000;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timeoutId = setInterval(changeBackgroundColor, COLOR_INTERVAL);
  refs.startBtn.setAttribute('disabled', '');
  refs.stopBtn.toggleAttribute('disabled', '');
}

function changeBackgroundColor() {
  refs.backgroundColor.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStopBtnClick() {
  refs.stopBtn.setAttribute('disabled', '');
  refs.startBtn.toggleAttribute('disabled', '');
  clearInterval(timeoutId);
}