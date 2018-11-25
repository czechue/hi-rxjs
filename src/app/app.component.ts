import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { MatButton } from '@angular/material';
import { map, scan, startWith, tap } from 'rxjs/operators';

export interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  template: `
    <button #right mat-raised-button color="accent">Move Right!</button>
    <div class="container">
      <div
        #ball
        class="ball"
        [style.left]="position.x + 'px'"
        [style.top]="position.y + 'px'"
      ></div>
    </div>
  `
})
export class AppComponent implements OnInit {
  position: any;
  @ViewChild('right') right!: MatButton;

  static getNativeElement(element: MatButton) {
    return element._elementRef.nativeElement;
  }

  // Move the ball to the right
  ngOnInit(): void {
    fromEvent(AppComponent.getNativeElement(this.right), 'click')
      .pipe(
        map(e => 10),
        startWith({ x: 400, y: 400 }),
        scan((acc: any, curr) => {
          return Object.assign({}, acc, { x: acc.x + curr });
        })
      )
      .subscribe(position => (this.position = position));
  }
}
