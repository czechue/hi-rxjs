import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { fromEvent } from 'rxjs';
import {MatButton} from '@angular/material';

@Component({
  selector: 'app-root',
  template: `
    <button #btn mat-button color="accent">Click me!</button>
    <div class="container">
      <h1>{{ message }}</h1>
    </div>
  `
})
export class AppComponent implements AfterViewInit {
  message!: string;
  @ViewChild('btn') btn!: MatButton;

  static getNativeElement(element: MatButton) {
    return element._elementRef.nativeElement;
  }

  // Message should appear only when Button is clicked with Shift pressed
  ngAfterViewInit(): void {
    fromEvent(AppComponent.getNativeElement(this.btn), 'click').subscribe(
      message => this.message = 'Beast Mode Activated!!!'
    );
  }
}
