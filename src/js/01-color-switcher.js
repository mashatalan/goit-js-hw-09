const refs = {
  btnStart: document.querySelector('#start-btn'),
  btnStop: document.querySelector('#stop-btn'),
  body: document.body,
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let intervalId = null;

function startChangingBackgroundColor() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
}

function stopChangingBackgroundColor() {
  clearInterval(intervalId);
  intervalId = null;
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}

refs.btnStart.addEventListener('click', startChangingBackgroundColor);
refs.btnStop.addEventListener('click', stopChangingBackgroundColor);