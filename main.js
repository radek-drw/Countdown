const spanDays = document.querySelector('span.days');
const spanHours = document.querySelector('span.hours');
const spanMinutes = document.querySelector('span.minutes');
const spanSeconds = document.querySelector('span.seconds');

const inputDate = document.querySelector('input.date');
const inputTime = document.querySelector('input.time');
const submitBtn = document.querySelector('button.submit');

let newDate;
let newTime;

// Start interval countdown
const countDown = () => {
   const endTime = new Date(`${newDate} ${newTime}`).getTime();
   const currentTime = new Date().getTime();
   // Days
   const days = Math.floor(endTime / (1000 * 60 * 60 * 24) - currentTime / (1000 * 60 * 60 * 24));
   // Hours
   let hours = Math.floor(endTime / (1000 * 60 * 60) - currentTime / (1000 * 60 * 60)) % 24;
   hours = hours < 10 ? `0${hours}` : hours;
   // Minutes
   let minutes = Math.floor(endTime / (1000 * 60) - currentTime / (1000 * 60)) % 60;
   minutes = minutes < 10 ? `0${minutes}` : minutes;
   // Seconds
   let seconds = Math.floor(endTime / 1000 - currentTime / 1000) % 60;
   seconds = seconds < 10 ? `0${seconds}` : seconds;

   spanDays.textContent = days;
   spanHours.textContent = hours;
   spanMinutes.textContent = minutes;
   spanSeconds.textContent = seconds;
}

// Function after click on SUBMIT button
const getDateAndTime = () => {
   newDate = inputDate.value;
   newTime = inputTime.value;
   // Check if user set date and time
   if (!newDate && !newTime) {
      return alert('Please select date and time!');
   } else if (newDate && !newTime) {
      return alert('Please select time!');
   } else if (!newDate && newTime) {
      return alert('Please select date!');
   }
   setInterval(countDown, 1000);
}

submitBtn.addEventListener('click', getDateAndTime); 