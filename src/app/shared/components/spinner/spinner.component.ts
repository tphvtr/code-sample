import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { config } from './config';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() mode: 'small' | 'medium';
  @Input() containerHeight = 480;
  params = config;
  constructor(public sanitizer: DomSanitizer) {
  }
}
