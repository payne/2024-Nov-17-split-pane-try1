// split-pane.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-split-pane',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="split-container">
      <div class="left-pane" [style.width.%]="leftPaneWidth">
        <ng-content select="[leftPane]"></ng-content>
      </div>

      <div #splitter
           class="splitter"
           (mousedown)="onMouseDown($event)"
           [class.dragging]="isDragging">
        <mat-icon>drag_indicator</mat-icon>
      </div>

      <div class="right-pane" [style.width.%]="100 - leftPaneWidth">
        <ng-content select="[rightPane]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .split-container {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .left-pane, .right-pane {
      height: 100%;
      overflow: auto;
    }

    .splitter {
      width: 8px;
      height: 100%;
      background-color: #f0f0f0;
      cursor: col-resize;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      user-select: none;

      &:hover, &.dragging {
        background-color: #dcdcdc;
      }

      mat-icon {
        color: #666;
        transform: rotate(90deg);
      }
    }
  `]
})
export class SplitPaneComponent implements AfterViewInit {
  @ViewChild('splitter') splitter!: ElementRef;

  leftPaneWidth = 50; // Default width in percentage
  isDragging = false;
  private containerWidth = 0;

  ngAfterViewInit() {
    this.containerWidth = (this.splitter.nativeElement as HTMLElement)
      .parentElement?.offsetWidth || 0;
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const containerRect = (this.splitter.nativeElement as HTMLElement)
      .parentElement?.getBoundingClientRect();

    if (!containerRect) return;

    const offset = event.clientX - containerRect.left;
    this.leftPaneWidth = (offset / containerRect.width) * 100;

    // Limit the minimum and maximum width
    this.leftPaneWidth = Math.min(Math.max(this.leftPaneWidth, 10), 90);
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }
}

