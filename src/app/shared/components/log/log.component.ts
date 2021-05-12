import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Log } from 'src/app/models';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogComponent implements OnInit {
  @Input() log: Log;
  constructor() { }

  ngOnInit() {
  }

}
