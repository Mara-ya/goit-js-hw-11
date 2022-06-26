import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),

    daysLeft: document.querySelector('[data-days]'),
    hoursLeft: document.querySelector('[data-hours]'),
    minutesLeft: document.querySelector('[data-minutes]'),
    secondsLeft: document.querySelector('[data-seconds]'),
}
let scheduledTime = 0;
let left = 0;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0].getTime() <= new Date()){
            Notify.failure("Please choose a date in the future")
            return
        }
        refs.btnStart.disabled = false;
        scheduledTime = selectedDates[0];
    },
};

refs.btnStart.disabled = true;

flatpickr(refs.input, options)

refs.btnStart.addEventListener('click', onLeftTime)

function onLeftTime (){
    const timerId = setInterval(() => {
        left = scheduledTime - new Date() - 1000
        const convertTime = convertMs(left)
        outputDate(convertTime)
        refs.btnStart.disabled = true;

        if (refs.daysLeft.textContent === '0' &&
            refs.hoursLeft.textContent === '00' &&
            refs.minutesLeft.textContent === '00' &&
            refs.secondsLeft.textContent === '00') {
            clearTimeout(timerId);
            return;
        };
    }, 1000);
}
function outputDate({ days, hours, minutes, seconds }){
    refs.daysLeft.textContent = days;
    refs.hoursLeft.textContent = ('0' + hours).slice(-2);
    refs.minutesLeft.textContent = ('0' + minutes).slice(-2);
    refs.secondsLeft.textContent = ('0' + seconds).slice(-2);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}