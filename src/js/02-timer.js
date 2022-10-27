import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  clickToClose: true,
});

let getElem = selector => document.querySelector(selector);
let intervalId = null;

getElem('button[data-start]').disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      getElem('button[data-start]').disabled = false;
    }
  },
};

const dateChoose = flatpickr(getElem('#datetime-picker'), options);

const timer = {
  isActive: false,
  start() {
    getElem('button[data-start]').disabled = true;
    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const chooseTime = dateChoose.selectedDates[0].getTime();
      const ms = chooseTime - currentTime;
      if (ms <= 0) {
        Notiflix.Notify.success('Time is out!');
        clearInterval(intervalId);
        return;
      }
      updateTimer(convertMs(ms));
    }, 1000);
  },
};

getElem('button[data-start]').addEventListener('click', () => {
  timer.start();
});

function updateTimer({ days, hours, minutes, seconds }) {
  getElem('.value[data-days]').textContent = days;
  getElem('.value[data-hours]').textContent = hours;
  getElem('.value[data-minutes]').textContent = minutes;
  getElem('.value[data-seconds]').textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
