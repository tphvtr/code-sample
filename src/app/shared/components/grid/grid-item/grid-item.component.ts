import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Grid, GridAction } from 'src/app/models';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridItemComponent {
  @Input() item: Grid;
  @Input() mode: string;
  @Input() width: number;
  @Input() height: number;

  @Output() action = new EventEmitter<GridAction>();

  onAction(id: string, fav_id: number, image_id: string): void {
    this.action.emit({id, fav_id, image_id});
  }

}
