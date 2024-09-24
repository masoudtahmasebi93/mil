import { Component } from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    DecimalPipe,
    MatButton
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  startTime: Date | null = null;
  elapsedTime = 0;
  timerInterval: any;

  startTimer() {
    this.startTime = new Date();
    this.timerInterval = setInterval(() => {
      this.elapsedTime = new Date().getTime() - this.startTime!.getTime();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  resetTimer() {
    this.stopTimer();
    this.elapsedTime = 0;
    this.startTime = null;
  }
}
