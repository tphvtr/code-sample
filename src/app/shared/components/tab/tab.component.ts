import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tab } from 'src/app/models';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
@Input() tab: Tab;
@Output() action = new EventEmitter<string>();

}
