import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Grid, GridAction } from 'src/app/models';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent {
  @Input() limit: number;
  @Input() items: Grid[];
  @Input() mode: 'FAV' | 'INFO' | 'GALLERY';
  @Input() isLoading: boolean;
  @Output() action = new EventEmitter<GridAction>();

  onAction(e: GridAction): void {
    this.action.emit(e);
  }

}
