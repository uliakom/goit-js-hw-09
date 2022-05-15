
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'), 
    startBtn: document.querySelector('[data-start]')
};

let intervalId = null;

unactivateStartBtn();

const options = {
  enableTime: true,
    time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat: "Y-m-d H:i",
onClose,
onChange() {
        clearInterval(intervalId);
    }
};

function onClose(selectedDates) {
    const userDate = selectedDates[0] - Date.now();
    console.log(userDate);

    if (userDate <= 0) {
        Notify.failure('Please choose a date in the future');
    }
     if (userDate > 0) {
        activateStartBtn();
        function startTimer() {
            intervalId = setInterval(() => {
        const timerDate= selectedDates[0] - Date.now();
        const convertedTime = convertMs(timerDate);
        updateTimerFace(convertedTime);
                unactivateStartBtn();
                if (timerDate < 1000) {
       clearInterval(intervalId); 
   }
    }, 1000);
        }; 
         refs.startBtn.addEventListener('click', startTimer);
    }   
    }

flatpickr("#datetime-picker", options);

function unactivateStartBtn() {
     refs.startBtn.setAttribute('disabled', '');
};

function activateStartBtn() {
     refs.startBtn.toggleAttribute('disabled', '');
};

function updateTimerFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
};

function pad(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
};
