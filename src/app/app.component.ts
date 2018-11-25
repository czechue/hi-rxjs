import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { MatButton } from '@angular/material';

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

  ngOnInit(): void {
    fromEvent(AppComponent.getNativeElement(this.right), 'click')
      .subscribe(
      position => (this.position = position)
    );
  }
}
