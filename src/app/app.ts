import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('zen-timer');
  timeLeft = signal(1500);
  maxTime = signal(1500);
  timerIsStart: boolean = false;
  isBreak = signal(false);

  timerId: any;

  minutes = computed(() => {
    return Math.floor(this.timeLeft() / 60);
  });
  seconds = computed(() => {
    return Math.floor(this.timeLeft() % 60);
  });

  displayTime = computed(() => {
    const m = this.minutes().toString().padStart(2, '0');
    const s = this.seconds().toString().padStart(2, '0');
    return `${m}:${s}`;
  });

  progress = computed(() => {
    return (this.timeLeft() / this.maxTime()) * 100;
  })

  startTimer() {
    if (!this.timerIsStart) {
      this.timerId = setInterval(() => {
        this.timeLeft.update(value => Math.max(0, value - 1));
        if (this.timeLeft() === 0) {
          this.stopInterval();
          new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
          this.switchMode();
        }
      }, 1000);
      this.timerIsStart = true
    } else {
      this.stopInterval();
    }
  }

  resetTimer() {
    this.stopInterval();
    this.timeLeft.set(this.maxTime());
  }

  switchMode() {
    this.stopInterval();
    if (!this.isBreak()) {
      this.timeLeft.set(300);
      this.maxTime.set(300);
      this.isBreak.set(true);
    } else {
      this.timeLeft.set(1500);
      this.maxTime.set(1500);
      this.isBreak.set(false);
    }
  }

  private stopInterval() {
    clearInterval(this.timerId);
    this.timerIsStart = false;
  }
}
