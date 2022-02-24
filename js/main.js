class Timer {
   constructor() {
      this.alarm = document.querySelector('#alarm');
      this.audio = document.querySelector('#audio');
      this.editTime = document.querySelector('#edit-time');
      this.hoursInput = document.querySelector('#hours');
      this.minutesInput = document.querySelector('#minutes');
      this.secondsInput = document.querySelector('#seconds');
      this.timerInputs = [...document.querySelectorAll('.clock__input')];

      this.runTime = document.querySelector('#run-time');
      this.rerunTime = document.querySelector('#rerun-time');

      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.totalTime = 0;
      this.currentTime = 0;

      this.maxHours = 99;
      this.maxMinutes = 60;
      this.maxSeconds = 60;
      this.maxTime = this.maxHours * 3600 + (this.maxMinutes - 1) * 60 + this.maxSeconds;

      this.isEdit = true;
      this.isCounting = false;

      this.interval = null;

      // Path to the icons, in case of change the icons path
      this.iconsPath = './assets/icons/sprite.svg#';
   }

   init() {
      this.addEventListeners();
   }

   addEventListeners() {
      this.editTime.addEventListener('click', () => this.switchEditTime());
      this.runTime.addEventListener('click', () => this.switchTimer());
      this.alarm.addEventListener('click', () => this.stopAlarm());
      this.rerunTime.addEventListener('click', () => this.resetTimer());

      this.timerInputs.forEach(timerInput => timerInput.addEventListener('keyup', e => e.keyCode === 13 && this.switchEditTime()));
   }

   switchEditTime() {
      // Edit input fields
      if (this.isEdit) {
         this.isCounting = false;
         clearInterval(this.interval);
         this.selectUseElement(this.editTime).setAttribute('xlink:href', `${this.iconsPath}done-24px`);

         this.selectUseElement(this.runTime).setAttribute('xlink:href', `${this.iconsPath}play_arrow-24px`);

         this.timerInputs.forEach(timerInput => {
            timerInput.removeAttribute('disabled');
            // timerInput.setAttribute('value', '');
            timerInput.classList.add('clock__input-edit');
         });
         this.runTime.setAttribute('disabled', '');

         this.isEdit = !this.isEdit;
         this.getTimerValues();
         this.setTimerValues();
         return;
      }

      // When input fields are set
      this.selectUseElement(this.editTime).setAttribute('xlink:href', `${this.iconsPath}create-24px`);

      this.timerInputs.forEach(timerInput => {
         timerInput.setAttribute('disabled', '');
         timerInput.classList.remove('clock__input-edit');
      });

      // Play button is available when time is set
      this.runTime.removeAttribute('disabled');

      this.isEdit = !this.isEdit;

      this.getTimerValues();
      this.setTimerValues();
   }

   switchTimer() {
      this.isCounting = !this.isCounting;

      if (this.isCounting) {
         this.selectUseElement(this.runTime).setAttribute('xlink:href', `${this.iconsPath}pause-24px`);
         this.interval = setInterval(() => this.updateTime(), 1000);
         return;
      }
      this.selectUseElement(this.runTime).setAttribute('xlink:href', `${this.iconsPath}play_arrow-24px`);
      clearInterval(this.interval);
   }

   selectUseElement(element) {
      return element.querySelector('use');
   }

   getTimerValues() {
      this.hours = parseInt(this.hoursInput.value, 10);
      this.minutes = parseInt(this.minutesInput.value, 10);
      this.seconds = parseInt(this.secondsInput.value, 10);

      this.countTotalTime();
   }

   setTimerValues() {
      const seconds = `0${this.currentTime % this.maxSeconds}`;
      const minutes = `0${Math.floor(this.currentTime / 60) % this.maxMinutes}`;
      const hours = `0${Math.floor(this.currentTime / 3600)}`;

      this.secondsInput.value = seconds.slice(-2);
      this.minutesInput.value = minutes.slice(-2);
      this.hoursInput.value = hours.slice(-2);
   }

   countTotalTime() {
      const timeSum = this.seconds + this.minutes * 60 + this.hours * 3600;
      this.totalTime = timeSum <= this.maxTime ? timeSum : this.maxTime;

      this.currentTime = this.totalTime;
   }

   updateTime() {
      if (this.currentTime) {
         this.currentTime--;
         this.setTimerValues();
         return;
      }
      clearInterval(this.interval);
      this.audio.play();
      this.alarm.classList.remove('hide');
      this.editTime.setAttribute('disabled', '');
      this.runTime.setAttribute('disabled', '');
      this.rerunTime.setAttribute('disabled', '');
   }

   stopAlarm() {
      this.audio.pause();
      this.alarm.classList.add('hide');
      this.editTime.removeAttribute('disabled', '');
      this.runTime.removeAttribute('disabled', '');
      this.rerunTime.removeAttribute('disabled', '');
      this.switchEditTime();
   }

   resetTimer() {
      this.currentTime = this.totalTime;
      this.setTimerValues();
   }
}

const timer = new Timer();

timer.init();