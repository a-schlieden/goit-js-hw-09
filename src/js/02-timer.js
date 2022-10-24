import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  //   width: '900px',
  position: 'center-top',
  clickToClose: true,
});

const datetimeInput = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
    console.log(Date.now());
    Notiflix.Notify.failure('Qui timide rogat docet negare');
  },
};

flatpickr(datetimeInput, options);

// console.log(flatpiktDate);

const refs = {
  daysEl: document.querySelector('.field[data-days]'),
  hoursEl: document.querySelector('.field[data-hours]'),
  minutesEl: document.querySelector('.field[data-minutes]'),
  secondsEl: document.querySelector('.field[data-seconds]'),
  startBtnEl: document.querySelector('button[data-start]'),
};

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;
    refs.startBtnEl.disabled = true;
    setInterval(() => {
      const currentTime = Date.now();
      const deltatime = currentTime - startTime;
      const { days, hours, minutes, seconds } = convertMs(deltatime);
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
  },
};

timer.start();

refs.startBtnEl.addEventListener('click', () => {
  timer.start();
});

function updateTimer({ days, hours, minutes, seconds }) {
  refs.hoursEl.textContent = days;
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

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
