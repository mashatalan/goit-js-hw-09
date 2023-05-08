import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('.start-button'),
  timer: document.querySelector('.timer'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let countdownDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    countdownDate = selectedDates[0];
    const currentDate = new Date();
    if (countdownDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

function onStartButton() {
  intervalId = setInterval(updateTimer, 1000);
  refs.startButton.disabled = true;
}

function updateTimer() {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  if (distance <= 0) {
    clearInterval(intervalId);
    intervalId = null;
    Notiflix.Notify.success('Countdown finished!');
  } else {
    const { days, hours, minutes, seconds } = convertMs(distance);
    refs.daysValue.textContent = days.toString().padStart(2, '0');
    refs.hoursValue.textContent = hours.toString().padStart(2, '0');
    refs.minutesValue.textContent = minutes.toString().padStart(2, '0');
    refs.secondsValue.textContent = seconds.toString().padStart(2, '0');
  }
}

refs.startButton.addEventListener('click', onStartButton);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}