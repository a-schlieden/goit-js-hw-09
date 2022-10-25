import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  // clickToClose: true,
});

const refs = {
  daysEl: document.querySelector('.field[data-days]'),
  hoursEl: document.querySelector('.field[data-hours]'),
  minutesEl: document.querySelector('.field[data-minutes]'),
  secondsEl: document.querySelector('.field[data-seconds]'),
  startBtnEl: document.querySelector('button[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
};

refs.startBtnEl.disabled = true;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtnEl.disabled = false;
    }
  },
};

const dateChoose = flatpickr(refs.dateInput, options);

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    refs.startBtnEl.disabled = true;
    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const chooseTime = dateChoose.selectedDates[0].getTime();
      const deltaTime = chooseTime - currentTime;
      console.log(deltaTime);
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      //console.log(`${days}:${hours}:${minutes}:${seconds}`);

      // updateTimer(convertMs(deltaTime));
    }, 1000);
  },
};

//timer.start();

refs.startBtnEl.addEventListener('click', () => {
  timer.start();
});

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
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
