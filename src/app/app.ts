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
  timerIsStart: boolean = false;

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

  startTimer() {
    if (!this.timerIsStart) {
      this.timerId = setInterval(() => {
        this.timeLeft.update(value => Math.max(0, value - 1));
        if (this.timeLeft() === 0) {
          this.stopInterval();
        }
      }, 1000);
      this.timerIsStart = true
    } else {
      this.stopInterval();
    }
  }

  resetTimer() {
    this.timeLeft.set(1500);
    this.stopInterval();
  }

  private stopInterval() {
    clearInterval(this.timerId);
    this.timerIsStart = false;
  }
}
